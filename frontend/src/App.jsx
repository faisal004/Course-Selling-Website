import "./App.css";
import ButtonAppBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div>
      <Router>
        <ButtonAppBar />
      
       
        <Routes>
          <Route  path={"/Signup" } element={<Signup />} />
          
          <Route  path={"/Login" } element={<Login />} />
          <Route  path={"/Home" } element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
