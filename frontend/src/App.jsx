import  { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ButtonAppBar from "./components/Navbar";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Welcome from "./components/Welcome.jsx";
import AdminLogin from "./pages/admin/AdminLogin";
import HomeForAdmin from "./pages/HomeForAdmin";
import AdminSignup from "./pages/admin/adminSignup";
import CreateCourse from "./pages/admin/CreateCourse";
import CourseEditPage from "./pages/admin/CourseEditPage";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    setUser(isAuthenticated);
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  const PrivateRoute = ({ element }) => {
    return user ? element : <Navigate to="/Home" />;
  };

  return (
    <div>
      <Router>
        <ButtonAppBar user={user} logout={handleLogout} />

        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/HomeForAdmin" element={<HomeForAdmin />} />
          <Route path="/HomeForAdmin/CreateCourse" element={<CreateCourse />} />
          <Route path="/HomeForAdmin/CourseEditPage/:courseId" element={<CourseEditPage  />} />

          <Route path="/AdminSignup" element={<AdminSignup />} />

          <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
