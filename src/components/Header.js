import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          ClickPics
        </Typography>

        <Box>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
