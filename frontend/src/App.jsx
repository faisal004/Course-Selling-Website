import "./App.css";
import ButtonAppBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";

function App() {
  return (
    <div>
      <Router>
        <ButtonAppBar />
       
        <Routes>
          <Route  path={"/Signup" } element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
