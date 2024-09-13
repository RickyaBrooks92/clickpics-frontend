import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("authToken"); // Check if the user is logged in
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        {/* Logo as a clickable link to the homepage */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          ClickPics {/* You can replace this with an image or logo */}
        </Typography>

        <Box>
          {token ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/profile"
                sx={{ marginRight: 2 }}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ marginRight: 2 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ marginRight: 2 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register"
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
