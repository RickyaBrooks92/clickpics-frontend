import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFilled, setEmailFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
        navigate("/");
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error logging in. Please try again.");
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  // Autofill detection function
  useEffect(() => {
    const autofillListener = () => {
      setEmailFilled(
        Boolean(document.querySelector('input[name="email"]:autofill'))
      );
      setPasswordFilled(
        Boolean(document.querySelector('input[name="password"]:autofill'))
      );
    };

    window.addEventListener("animationstart", autofillListener, true);
    return () =>
      window.removeEventListener("animationstart", autofillListener, true);
  }, []);

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Please login to continue
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            label={emailFilled ? "" : "Email"}
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              sx: {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "black",
                },
              },
            }}
            InputLabelProps={{
              shrink: emailFilled || Boolean(email),
            }}
          />

          <TextField
            label={passwordFilled ? "" : "Password"}
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "black",
                },
              },
            }}
            InputLabelProps={{
              shrink: passwordFilled || Boolean(password),
            }}
          />

          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>

        {/* Link to the registration page */}
        <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#FFC107" }}
          >
            Register here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
