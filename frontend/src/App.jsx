import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";

import SignIn from "./components/admin/SignIn/SignIn";
import Dashboard from "./components/admin/dashboard/Dashboard";
import { Home } from "./components/home/Home";
import SignInOptions from "./components/siginOptions/SignInOptions";
import StaffDashboard from "./components/staff/StaffDashboard";
import Temp from "./components/staff/temp/temp";
function App() {
  const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: "class",
    breakpoints: {
      values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
    },
  });
  return (
    <AppProvider theme={demoTheme}>
      <Router>
        <Routes>
          <Route path="/signinoptions" element={<SignInOptions />} />
          <Route path="/" element={<Home></Home>} />
          <Route path="/admin/signin" element={<SignIn />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/temp/:type" element={<Temp />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
