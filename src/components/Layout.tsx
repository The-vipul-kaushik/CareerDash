import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "@mui/material";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "120vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <main style={{ flex: 1, marginTop: "4rem", marginBottom: "4rem" }}>
        <Container maxWidth="md">{children}</Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
