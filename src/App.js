import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateEvent from "./components/CreateEvent";
import UploadImage from "./components/UploadImage";
import Dashboard from "./components/DashBoard";
import Header from "./components/Header"; // Import the Header component

// Create a custom theme with yellow and black colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC107", // Yellow color
    },
    secondary: {
      main: "#000000", // Black color
    },
    background: {
      default: "#f5f5f5", // Light gray background color for the app
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
  const [, setAuthToken] = useState(localStorage.getItem("authToken") || null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header /> {/* Add the header here */}
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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
