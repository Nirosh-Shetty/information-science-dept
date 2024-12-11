import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";

import { Home } from "./components/home/Home";
import SignInOptions from "./components/siginOptions/SignInOptions";
import StaffDashboard from "./components/staff/StaffDashboard";

import SignIn from "./components/SignIn/SignIn";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import StudentDashboard from "./components/student/dashboard/StudentDashboard";
import { QuizSubmission } from "./components/student/dashboard/features/quiz/quizSubmisson/QuizSubmission";

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
          <Route path="/" element={<SignInOptions/>} />
          {/* <Route path="/admin/signin" element={<SignIn />} /> */}
          <Route path="/signin/:role" element={<SignIn />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/quiz/:quizId/:studentId" element={<QuizSubmission />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
