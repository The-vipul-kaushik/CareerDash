import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post("/api/register", {
    //     username,
    //     email,
    //     password,
    //   });
    //   // Redirect to login page after successful registration
    //   navigate("/login");
    // } catch (error) {
    //   setError("Error registering. Please try again.");
    // }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleRegister}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Register
        </Button>
      </form>
      <Typography variant="body2" sx={{ marginTop: 4 }}>
        Already have an account?{" "}
        <Link href="/login" variant="body2">
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
