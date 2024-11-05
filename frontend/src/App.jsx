import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/admin/SignIn/SignIn";
import Dashboard from "./components/admin/dashboard/Dashboard";
import { Home } from "./components/home/Home";
import SignInOptions from "./components/siginOptions/SignInOptions";
import StaffDashboard from "./components/staff/StaffDashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signinoptions" element={<SignInOptions />} />
        <Route path="/" element={<Home></Home>} />
        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
