import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import DashboardContent from "./features/DashboardContent";
import { BACKEND_URL } from "../../../../globals";
import { useRecoilState } from "recoil";
import { studentAtom } from "../../../../recoil/atoms/studentAtom";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "student/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    onclick: () => console.log("I am clicked - Dashboard"),
  },
  {
    segment: "student/grades",
    title: "Grades",
    icon: <SchoolIcon />,
    onclick: () => console.log("I am clicked - Grades"),
  },
  {
    segment: "student/attendance",
    title: "Attendance",
    icon: <AssignmentIcon />,
    onclick: () => console.log("I am clicked - Attendance"),
  },
  {
    segment: "student/assignments",
    title: "Assignments",
    icon: <AssignmentIcon />,
    onclick: () => console.log("I am clicked - Assignments"),
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Profile",
  },
  {
    segment: "student/profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
    onclick: () => console.log("I am clicked - Profile"),
  },
  {
    segment: "student/logout",
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

export default function StudentDashboard(props) {
  const [student, setStudent] = useRecoilState(studentAtom);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const { window } = props;
  const router = useDemoRouter("/student/dashboard");
  const demoWindow = window ? window() : undefined;

  React.useEffect(() => {
    if (
      ![
        "/student/dashboard",
        "/student/grades",
        "/student/attendance",
        "/student/assignments",
        "/student/profile",
      ].includes(router.pathname)
    ) {
      router.navigate("/student/dashboard");
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
            role: "student",
          },
        });
        const data = await res.json();
        // console.log("dashboard" + data);
        setStudent(data.User);
      } catch (err) {
        setStudent(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    if (!loading && (student === undefined || !student)) {
      navigate("/signin/student");
    }
  }, [student, navigate, loading]);

  function GradesContent() {
    return <h1>Grades</h1>;
  }
  function AttendanceContent() {
    return <h1>Attendance</h1>;
  }
  function AssignmentsContent() {
    return <h1>Assignments</h1>;
  }
  function ProfileContent() {
    return <h1>Profile</h1>;
  }

  const renderPageContent = React.useCallback(() => {
    switch (router.pathname) {
      case "/student/dashboard":
        return <DashboardContent />;
      case "/student/grades":
        return <GradesContent />;
      case "/student/attendance":
        return <AttendanceContent />;
      case "/student/assignments":
        return <AssignmentsContent />;
      case "/student/profile":
        return <ProfileContent />;
      case "/student/logout":
        localStorage.setItem("token", "");
        return navigate("/signinoptions");
      default:
        return <h1>Welcome to Student Dashboard</h1>;
    }
  }, [router.pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{ title: "Atria IT Student Portal" }}
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
  );
}
