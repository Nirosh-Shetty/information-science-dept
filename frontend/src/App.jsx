import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";

import { Home } from "./components/home/Home";
import SignInOptions from "./components/siginOptions/SignInOptions";
import StaffDashboard from "./components/staff/StaffDashboard";

import SignIn from "./components/SignIn/SignIn";
import AdminSignIn from "./components/admin/SignIn/AdminSignIn";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
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
          {/* <Route path="/admin/signin" element={<SignIn />} /> */}
          <Route path="/signin/:role" element={<SignIn />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/temp/:type" element={<Temp />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
