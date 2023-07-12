import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';

import { useNavigate } from "react-router-dom";

export default function ButtonAppBar({ user, logout }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className="bg-blue-700 ">
          <Typography
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            CourseVista
          </Typography>

          {!user ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                Login
              </Button>

              <Button
                color="inherit"
                onClick={() => {
                  navigate("/Signup");
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
               <Avatar sx={{ width: 24, height: 24 }}></Avatar>
            <Button
              onClick={() => {
                logout();
                navigate("/");
              }}
              color="inherit"
            >
              Log Out
            </Button>
            
            
            </>
         
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
