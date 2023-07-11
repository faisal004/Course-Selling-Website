import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center mt-10 p-5 ">
      <Card className="space-y-3 p-10">
        <div>LOG IN</div>
        <div className="">
          <TextField
            id="outlined-basic"
            label="Email"
            type="Email"
            variant="outlined"
          />
        </div>
        <div>
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </div>
        <Button variant="contained">LogIn</Button>
        <div>
          Don&apos;t have an account?<Link to={"/Signup"}>Signup</Link>
        </div>{" "}
      </Card>
    </div>
  );
};

export default Login;
