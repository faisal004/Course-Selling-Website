import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex justify-center mt-10 p-5 ">
      <Card className="space-y-3 p-10">
        <div>SIGN UP</div>

        <div className="">
          <TextField id="outlined-basic" label="Email" type="Email" variant="outlined" />
        </div>
        <div>
          <TextField id="outlined-basic" label="Username" variant="outlined" />
        </div>
        <div>
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </div>
        <Button variant="contained">Sign UP</Button>
        <div>Already have an account?<Link to={"/Login"}>Login</Link></div>      </Card>
    </div>
  );
};

export default Signup;
