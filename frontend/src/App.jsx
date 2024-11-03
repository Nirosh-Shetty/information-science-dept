import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./components/admin/SignIn/SignInSide";
import Dashboard from "./components/admin/dashboard/Dashboard";
import { Home } from "./components/home/Home";
import SignInOptions from "./components/siginOptions/SignInOptions";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signinoptions" element={<SignInOptions />} />
        <Route path="/" element={<Home></Home>} />
        <Route path="/admin/signin" element={<SignInSide />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
