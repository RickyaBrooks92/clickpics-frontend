import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const Pricing = () => {
  const pricingOptions = [
    { title: "Standard", guests: "50-100 Guests", price: "$500" },
    { title: "Premium", guests: "100-200 Guests", price: "$750" },
    { title: "Deluxe", guests: "200-300 Guests", price: "$1000" },
    { title: "Custom", guests: "Contact us for a custom quote", price: "" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Select the best plan based on your guest count, or contact us for a
        custom quote!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {pricingOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={3}
              sx={{ textAlign: "center", p: 3, bgcolor: "#f5f5f5" }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {option.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
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
    </Container>
  );
};

export default Pricing;
