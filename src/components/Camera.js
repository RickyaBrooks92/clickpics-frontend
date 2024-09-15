import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";

const Camera = () => {
  const [hasCameraAccess, setHasCameraAccess] = useState(false); // Track camera access state
  const [loading, setLoading] = useState(true); // Loading state
  const [errorMessage, setErrorMessage] = useState(null); // Error state
  const videoRef = useRef(null); // Reference to the video element

  // Request camera access when component mounts
  useEffect(() => {
    const requestCameraAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setHasCameraAccess(true);
        setErrorMessage(null);

        // Display the video feed
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setErrorMessage("Camera access denied or unavailable.");
      } finally {
        setLoading(false);
      }
    };

    requestCameraAccess();
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
      <Paper elevation={3} sx={{ padding: 4 }}>
        {hasCameraAccess ? (
          <>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Camera Access Granted
            </Typography>

            {/* Video element to display the camera feed */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <video
                ref={videoRef}
                width="100%"
                height="auto"
                autoPlay
                playsInline
                style={{ borderRadius: "16px" }}
              />
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#FFC107",
                  color: "#000",
                  "&:hover": { backgroundColor: "#e0a800" },
                }}
              >
                Capture Photo (Coming Soon)
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="h6" color="error">
            {errorMessage}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Camera;
