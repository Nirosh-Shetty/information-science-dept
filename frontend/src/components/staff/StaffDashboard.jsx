import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useRecoilState } from "recoil";
import { BACKEND_URL } from "../../../globals";
import { useNavigate } from "react-router-dom";
import { staffAtom } from "../../../recoil/atoms/staffAtom";
import DashboardContent from "./features/DashboardContent";
import Attendence from "./attendance/Attendance";
import Temp from "./temp/temp";
import MyClassesContent from "./features/MyClassesContent";

const STAFF_NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "staff/dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "staff/classes", title: "My Classes", icon: <PeopleAltIcon /> },
  {
    segment: "staff/assignments",
    title: "Assignments",
    icon: <DescriptionIcon />,
  },
  { kind: "divider" },
  { kind: "header", title: "Resources & Analytics" },
  { segment: "staff/resources", title: "Resources", icon: <LayersIcon /> },
  { segment: "staff/attendance", title: "Attendance", icon: <BarChartIcon /> }, // Updated from Student Feedback to Attendance
  { kind: "divider" },
  { kind: "header", title: "Profile" },
  { segment: "staff/profile", title: "Profile", icon: <AccountCircleIcon /> },
  { segment: "staff/leaves", title: "Leave Requests", icon: <LogoutIcon /> },
  { segment: "staff/logout", title: "Log Out", icon: <LogoutIcon /> },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
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


function AssignmentsContent() {
  return <div>Assignments Page - Manage and grade assignments</div>;
}

function ResourcesContent() {
  return <Temp />;
}

// function AttendanceContent() {
//   return <div>Attendance Page - View attendance records and statistics</div>;
// }

function StaffProfileContent() {
  return <div>Profile Page - Manage profile details</div>;
}

function LeaveRequestsContent() {
  return <div>Leave Requests Page - View and submit leave requests</div>;
}

export default function StaffDashboard(props) {
  const [staff, setStaff] = useRecoilState(staffAtom);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const { window } = props;
  const router = useDemoRouter("/staff/dashboard");
  const demoWindow = window ? window() : undefined;

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${BACKEND_URL}/authoriseuser`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            role: "staff",
          },
        });
        const data = await res.json();
        // console.log("dashboard" + data);
        setStaff(data.User);
      } catch (err) {
        setStaff(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    if (!loading && (staff === undefined || !staff)) {
      navigate("/signin/staff");
    }
  }, [staff, navigate, loading]);

  React.useEffect(() => {
    if (
      ![
        "/staff/dashboard",
        "/staff/classes",
        "/staff/assignments",
        "/staff/resources",
        "/staff/attendance",
        "/staff/profile",
        "/staff/leaves",
      ].includes(router.pathname)
    ) {
      router.navigate("/staff/dashboard");
    }
  }, [router]);

  const renderPageContent = React.useCallback(() => {
    switch (router.pathname) {
      case "/staff/dashboard":
        return <DashboardContent />;
      case "/staff/classes":
        return <MyClassesContent />;
      case "/staff/assignments":
        return <AssignmentsContent />;
      case "/staff/resources":
        return <ResourcesContent />;
      case "/staff/attendance":
        return <Attendence />;
      case "/staff/profile":
        return <StaffProfileContent />;
      case "/staff/leaves":
        return <LeaveRequestsContent />;
      case "/staff/logout":
        localStorage.setItem("token", "");
        return navigate("/staff/signin");
      default:
        return <DashboardContent />;
    }
  }, [router.pathname]);

  return (
    <AppProvider
      navigation={STAFF_NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{ title: "Atria IT ISE Department - Staff" }}
      window={demoWindow}
    >
      {/* <CssBaseline /> */}

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
  );
}

//TODO: redirect back to admin/student dashboard when tried to open this url with admin/student login
