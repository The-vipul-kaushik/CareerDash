import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#2563EB", color: "#fff", py: 2 }}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} CareerDash. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
