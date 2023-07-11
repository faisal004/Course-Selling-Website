import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Link} from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      console.log("Email:", value);
    } else if (name === "username") {
      setUsername(value);
      console.log("Username:", value);
    } else if (name === "password") {
      setPassword(value);
      console.log("Password:", value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };
    try {
      let res = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let response = await res.json();
      console.log(response.token);
      localStorage.setItem("token",response.token)
      setEmail("");
      setUsername("");
      setPassword("");
      navigate("/Home")
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 p-5 ">
      <Card className="space-y-3 p-10">
        <div>SIGN UP</div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="">
            <TextField
              id="outlined-basic"
              label="Email"
              type="Email"
              name="email"
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Username"
              name="username"
              variant="outlined"
              onChange={handleChange}
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
            />
          </div>
          <Button type="submit" variant="contained">
            Sign UP
          </Button>
        </form>
        <div>
          Already have an account?<Link to={"/Login"}>Login</Link>
        </div>{" "}
      </Card>
    </div>
  );
};

export default Signup;
