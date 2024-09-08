import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent"; // Example component
import UploadImage from "./components/UploadImage"; // Example component

function App() {
  const [, setAuthToken] = useState(localStorage.getItem("authToken") || null);

  // Create a custom theme with yellow and black colors
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFC107", // Yellow
      },
      secondary: {
        main: "#000000", // Black
      },
      background: {
        default: "#f5f5f5", // Light background color
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={<Register setAuthToken={setAuthToken} />}
            />
            <Route
              path="/login"
              element={<Login setAuthToken={setAuthToken} />}
            />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/upload-image" element={<UploadImage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
