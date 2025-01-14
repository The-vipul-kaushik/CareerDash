// src/components/Footer.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ padding: 2, backgroundColor: "#3f51b5", color: "white", textAlign: "center" }}>
      <Typography variant="body2">
        &copy; 2025 CareerDash. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
