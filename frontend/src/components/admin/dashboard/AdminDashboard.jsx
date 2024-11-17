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
import ManageStaffContent from "./features/ManageStaffContent";
import ManageStudentContent from "./features/ManageStudentContent";
import ProfileContent from "./features/ProfileContent";
import Placement from "./placement/Placement";
import LogoutIcon from "@mui/icons-material/Logout";
import Academic from "./features/Academic";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "admin/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    onclick: () => console.log("I am clicked - Dashboard"),
  },
  {
    segment: "admin/managestaff",
    title: "Manage Staff",
    icon: <ManageAccountsIcon />,
    onclick: () => console.log("I am clicked - Manage Staff"),
  },
  {
    segment: "admin/managestudent",
    title: "Manage Students",
    icon: <PeopleAltIcon />,
    onclick: () => console.log("I am clicked - Manage Students"),
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
    onclick: () => console.log("I am clicked - Student Performance"),
    children: [
      {
        segment: "academic",
        title: "Academic",
        icon: <DescriptionIcon />,
        onclick: () => console.log("I am clicked - Academic"),
      },
    ],
  },
  {
    segment: "admin/placements",
    title: "Placement",
    icon: <LayersIcon />,
    onclick: () => console.log("I am clicked - Placement"),
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
      width: "100%",
    },
    onclick: () => console.log("I am clicked - Profile"),
  },
  {
    segment: "admin/logout",
    title: "Log Out",
    icon: <LogoutIcon />,
    onclick: () => {
      console.log("I am clicked - Log Out");
      localStorage.setItem("token", "");
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

export default function AdminDashboard(props) {
  const [admin, setAdmin] = useRecoilState(adminAtom);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
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

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${BACKEND_URL}/authoriseuser`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            role: "admin",
          },
        });
        const data = await res.json();
        // console.log("dashboard" + data);
        setAdmin(data.User);
      } catch (err) {
        setAdmin(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    if (!loading && (admin === undefined || !admin)) {
      navigate("/signin/admin");
    }
  }, [admin, navigate, loading]);

  const renderPageContent = React.useCallback(() => {
    switch (router.pathname) {
      case "/admin/dashboard":
        return <DashboardContent />;
      case "/admin/managestaff":
        return <ManageStaffContent />;
      case "/admin/managestudent":
        return <ManageStudentContent />;
      case "/admin/studentperformance/academic":
        return <Academic />;
      case "/admin/placements":
        return <Placement />;
      case "/admin/profile":
        return <ProfileContent />;
      case "/admin/logout":
        localStorage.setItem("token", "");
        return navigate("/signinoptions");
      default:
        return <DashboardContent />;
    }
  }, [router.pathname]);

  return (
    !loading &&
    admin && (
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
            position: "relative",
          }}
        >
          <PageContainer>{renderPageContent()}</PageContainer>
        </DashboardLayout>
      </AppProvider>
    )
  );
}
