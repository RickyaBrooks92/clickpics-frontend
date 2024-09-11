import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const pricingOptions = [
    { title: "Standard", guests: "50-100 Guests", price: "$500" },
    { title: "Premium", guests: "100-200 Guests", price: "$750" },
    { title: "Deluxe", guests: "200-300 Guests", price: "$1000" },
    { title: "Custom", guests: "Contact us for a custom quote", price: "" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      {/* Introduction Section */}
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to ClickPics
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Capture your life's best moments through the eyes of those who matter
          most.
        </Typography>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Pricing Plans
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Select the best plan for your event.
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {pricingOptions.map((option, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  textAlign: "center",
                  p: 3,
                  bgcolor: "#f5f5f5",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {option.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {option.guests}
                  </Typography>
                  {option.price && (
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ color: "#FFC107" }}
                    >
                      {option.price}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ mt: 3 }}>
                  {option.title === "Custom" ? (
                    <Button
                      component={Link}
                      to="/contact"
                      variant="contained"
                      sx={{
                        bgcolor: "#000",
                        color: "#FFC107",
                        "&:hover": { bgcolor: "#333" },
                      }}
                    >
                      Contact Us
                    </Button>
                  ) : (
                    <Button
                      component={Link}
                      to={`/register?plan=${option.title}`}
                      variant="contained"
                      sx={{
                        bgcolor: "#FFC107",
                        color: "#000",
                        "&:hover": { bgcolor: "#ffb300" },
                      }}
                    >
                      Choose Plan
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
