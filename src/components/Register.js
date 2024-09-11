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

function Register({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFilled, setEmailFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);
  const [confirmPasswordFilled, setConfirmPasswordFilled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
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
        setErrorMessage(
          data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage("Error registering. Please try again.");
    }
  };

  // Autofill detection function
  useEffect(() => {
    const autofillListener = () => {
      setEmailFilled(
        Boolean(document.querySelector('input[name="email"]:autofill'))
      );
      setPasswordFilled(
        Boolean(document.querySelector('input[name="password"]:autofill'))
      );
      setConfirmPasswordFilled(
        Boolean(
          document.querySelector('input[name="confirmPassword"]:autofill')
        )
      );
    };

    window.addEventListener("animationstart", autofillListener, true);
    return () =>
      window.removeEventListener("animationstart", autofillListener, true);
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Create an Account
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Join us and start capturing memories!
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
            type={showPassword ? "text" : "password"} // Toggle between text and password
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              sx: {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "black",
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: passwordFilled || Boolean(password),
            }}
          />

          <TextField
            label={confirmPasswordFilled ? "" : "Confirm Password"}
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              sx: {
                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "black",
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: confirmPasswordFilled || Boolean(confirmPassword),
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
            Register
          </Button>
        </form>

        {/* Link to login page */}
        <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#FFC107" }}
          >
            Log in here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
