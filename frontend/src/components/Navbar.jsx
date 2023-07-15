import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useState ,useEffect} from "react";

import { useNavigate } from "react-router-dom";

export default function ButtonAppBar({ user, logout }) {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  useEffect(() => {
    setIsDropdownVisible(false); // Close the dropdown when the page changes
  }, []);
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
              <div className="relative">
                <Avatar
                  onClick={toggleDropdown}
                  sx={{ width: 24, height: 24 }}
                ></Avatar>
                {isDropdownVisible && (
                  <div className="bg-white text-black rounded-md absolute right-0 top-7 w-44 flex flex-col">
                    <Button
                      onClick={() => {
                      
                        navigate("/Home/UserDashBoared");
                      }}
                      color="inherit"
                    >
                      User Dashboard
                    </Button>
                    <Button onClick={handleLogout} color="inherit">
                      Log Out
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
