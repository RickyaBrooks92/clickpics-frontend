import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container, Stack } from "@mui/material";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h2" color="primary" gutterBottom>
          Welcome to ClickPics
        </Typography>

        {isLoggedIn ? (
          <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = "/create-event")}
              sx={{ color: "#000" }} // Black text on yellow button
            >
              Create Event
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => (window.location.href = "/upload-image")}
              sx={{ color: "#fff" }} // White text on black button
            >
              Upload Image
            </Button>
            <Button variant="outlined" color="secondary" onClick={logout}>
              Logout
            </Button>
          </Stack>
        ) : (
          <Box mt={4}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Please log in or register to create events and upload images.
            </Typography>
            <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register"
                sx={{ color: "#000" }} // Black text on yellow button
              >
                Register
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
