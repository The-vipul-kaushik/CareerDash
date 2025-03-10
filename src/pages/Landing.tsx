import React from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

const Landing = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F3F4F6",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "#1E40AF" }}
            >
              Track & Manage <br /> Your Job Applications
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: "#374151" }}>
              CareerDash helps you stay organized in your job search. Track
              applications, set reminders, and land your dream job efficiently.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                component={Link}
                to="/register"
                sx={{
                  backgroundColor: "#2563EB",
                  color: "#fff",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/login"
                sx={{
                  ml: 2,
                  borderColor: "#2563EB",
                  color: "#2563EB",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                }}
              >
                Login
              </Button>
            </Box>
          </Grid>

          {/* Right Image */}
          <Grid item xs={12} md={6}>
            <img
              src={logo}
              alt="Job Application Management"
              style={{ width: "30vh", maxWidth: "30rem" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing;
