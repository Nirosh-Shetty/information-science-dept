import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile Icon
import DashboardContent from "./features/DashboardContent";
import { useRecoilState } from "recoil";
import { adminAtom } from "../../../../recoil/atoms/adminAtom";
import { BACKEND_URL } from "../../../../globals";
import { useNavigate } from "react-router-dom";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "admin/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "admin/managestaff",
    title: "Manage Staff",
    icon: <ManageAccountsIcon />,
  },
  {
    segment: "admin/managestudent",
    title: "Manage Students",
    icon: <PeopleAltIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "admin/studentperformance",
    title: "Student Performance",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "attendance",
        title: "Attendance",
        icon: <DescriptionIcon />,
      },
      {
        segment: "academic",
        title: "Academic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "admin/placements",
    title: "Placement",
    icon: <LayersIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Profile",
  },
  {
    segment: "admin/profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
    sx: {
      position: "absolute",
      bottom: 0,
      width: "100%", // Ensures it aligns with other nav items
    },
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    }),
    [pathname]
  );

  return router;
}

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

function ManageStaffContent() {
  return <div>Manage Staff Page</div>;
}

function ManageStudentContent() {
  return <div>Manage Student Page</div>;
}

function AttendanceContent() {
  return <div>Attendance Page</div>;
}

function Academic() {
  return <div>Academic Page</div>;
}

function Placement() {
  return <div>Placement Page</div>;
}

function ProfileContent() {
  return <div>Profile Page</div>;
}

export default function Dashboard(props) {
  const [admin, setAdmin] = useRecoilState(adminAtom)
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate()
  const { window } = props;
  const router = useDemoRouter("/admin/dashboard");
  const demoWindow = window ? window() : undefined;

  React.useEffect(() => {
    // Navigate to default page if an invalid path is found
    if (
      ![
        "/admin/dashboard",
        "/admin/managestaff",
        "/admin/managestudent",
        "/admin/studentperformance/attendance",
        "/admin/studentperformance/academic",
        "/admin/placements",
        "/admin/profile",
      ].includes(router.pathname)
    ) {
      router.navigate("/admin/dashboard");
    }
  }, [router]);

  React.useEffect(()=>{
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${BACKEND_URL}/admin/dashboard`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("dashboard"+data)
        setAdmin(data.adminUser);
      } catch (err) {
        setAdmin(null)
        console.log(err);
      }finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchData();
  },[])

  React.useEffect(()=>{
    console.log(loading +"I came here"+ admin)
    if(!loading && (admin === undefined || !admin) ){
      navigate('/login')
    }
  },[admin, navigate, loading])

  const renderPageContent = () => {
    switch (router.pathname) {
      case "/admin/dashboard":
        return <DashboardContent />;
      case "/admin/managestaff":
        return <ManageStaffContent />;
      case "/admin/managestudent":
        return <ManageStudentContent />;
      case "/admin/studentperformance/attendance":
        return <AttendanceContent />;
      case "/admin/studentperformance/academic":
        return <Academic />;
      case "/admin/placements":
        return <Placement />;
      case "/admin/profile":
        return <ProfileContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    !loading &&
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{ title: "Atria IT ISE department" }}
      window={demoWindow}
    >
      <DashboardLayout
        sx={{
          overflow: "hidden",
          maxWidth: "100%",
          whiteSpace: "nowrap",
          position: "relative", // Allows Profile to be positioned absolutely
        }}
      >
        <PageContainer>{renderPageContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
