import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Use navigate to move between routes
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null); // Holds the user info fetched from the backend
  const [loading, setLoading] = useState(true); // Loading state to show loader while fetching
  const navigate = useNavigate(); // For navigation after creating an event

  // Fetch user info when the component mounts
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get the token from localStorage
        const response = await fetch(
          "http://localhost:5001/api/users/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Pass the token for authentication
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUserInfo(data); // Set the user data on success
        } else {
          console.error("Failed to fetch user info:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: "16px", // Rounded corners for modern look
        }}
      >
        {userInfo ? (
          <>
            {/* Profile Header with Avatar */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#FFC107", // Yellow background for avatar
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 70, color: "#000" }} />
              </Avatar>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#000",
                mb: 1,
              }}
            >
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "#777", // Subtle gray for email text
                mb: 4,
              }}
            >
              {userInfo.email}
            </Typography>
            <Divider sx={{ mb: 3 }} /> {/* Divider for separation */}
            {/* Assigned Event Section */}
            <Typography variant="h6" gutterBottom>
              Events
            </Typography>
            {userInfo.events && userInfo.events.length > 0 ? (
              userInfo.events.map((event) => (
                <Box key={event._id} sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    Event Name: {event.name}
                  </Typography>
                  <Typography variant="body2">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                You haven't created any events yet.
              </Typography>
            )}
            <Divider sx={{ mt: 3, mb: 4 }} /> {/* Divider for separation */}
            {/* Create Event Button */}
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#FFC107",
                  color: "#000",
                  "&:hover": { backgroundColor: "#e0a800" },
                }}
                onClick={() => navigate("/create-event")} // Navigate to CreateEvent page
              >
                Create Event
              </Button>
            </Box>
            <Divider sx={{ mt: 3, mb: 4 }} />
            {/* Profile Actions */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                disabled
                sx={{
                  backgroundColor: "#FFC107",
                  color: "#000",
                  "&:hover": { backgroundColor: "#e0a800" },
                }}
              >
                Edit Profile (Coming Soon)
              </Button>
              <Button
                variant="outlined"
                disabled
                sx={{
                  borderColor: "#000",
                  color: "#000",
                  "&:hover": {
                    borderColor: "#333",
                    color: "#333",
                  },
                }}
              >
                Change Password (Coming Soon)
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="error">
            Error loading profile information.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
