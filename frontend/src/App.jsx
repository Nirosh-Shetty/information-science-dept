import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/admin/SignIn/SignIn";
import Dashboard from "./components/admin/dashboard/Dashboard";
import { Home } from "./components/home/Home";
import SignInOptions from "./components/siginOptions/SignInOptions";
import StaffDashboard from "./components/staff/StaffDashboard";
import DashboardContent from "./components/staff/features/DashboardContent";
import ManageStaffContent from "./components/admin/dashboard/features/ManageStaffContent";
import ManageStudentContent from "./components/admin/dashboard/features/ManageStudentContent"
import ProfileContent from "./components/admin/dashboard/features/ProfileContent";
import Academic from "./components/admin/dashboard/features/Academic";
import Placement from "./components/admin/dashboard/placement/Placement";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signinoptions" element={<SignInOptions />} />
        <Route path="/" element={<Home></Home>} />
        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="managestaff" element={<ManageStaffContent />} />
          <Route path="managestudent" element={<ManageStudentContent />} />
          <Route path="studentperformance/academic" element={<Academic />} />
          <Route path="placements" element={<Placement />} />
          <Route path="profile" element={<ProfileContent />} />
        </Route>
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
