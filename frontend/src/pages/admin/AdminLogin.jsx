import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      console.log("Email:", value);
    } else if (name === "password") {
      setPassword(value);
      console.log("Password:", value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,

      password,
    };
    try {
      let res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let response = await res.json();
      console.log(response.message);
      if (response.message === "Invalid email or password") {
        toast.warn("Invalid email or password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        localStorage.setItem("token", response.token);
        toast.success("Success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setEmail("");

        setPassword("");
        setTimeout(() => {
          
          navigate("/HomeForAdmin");
          window.location.reload()
        }, 1000);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 p-5 ">
      <Card className="space-y-3 p-10">
        <div>LOG IN AS TEACHER</div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="">
            <TextField
              id="outlined-basic"
              label="Email"
              type="Email"
              name="email"
              variant="outlined"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" variant="contained">
            LogIn
          </Button>
        </form>
        <div>
          Don&apos;t have an account?<Link to={"/AdminSignup"}>Signup</Link>
        </div>{" "}
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
