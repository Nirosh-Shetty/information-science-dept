import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./components/admin/SignIn/SignInSide";
``
function App() {
  return (
    <Router >
      <Routes>
        <Route path="/login" element={<SignInSide/>}/>
      </Routes>
    </Router>
  );
}

export default App;
