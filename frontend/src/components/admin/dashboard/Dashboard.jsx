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
    title: "Placemnent",
    icon: <LayersIcon />,
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

function DashboardContent() {
  return <div>dashboard page</div>;
}

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

function Placemnent() {
  return <div>Placement Page</div>;
}

export default function Dashboard(props) {
  const { window } = props;
  const router = useDemoRouter("/admin/dashboard");
  const demoWindow = window ? window() : undefined;

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
        return <Placemnent />;
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>{renderPageContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
