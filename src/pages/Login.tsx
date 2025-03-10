import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make sure to update this endpoint to match your backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          username, // Changed from email to username
          password,
        }
      );

      const { token } = response.data;

      // Store the JWT token in localStorage
      localStorage.setItem("token", token);

      // console.log(localStorage.getItem("token"));
      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Username" // Changed from Email to Username
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Login
        </Button>
      </form>
      <Typography variant="body2" sx={{ marginTop: 4 }}>
        Don't have an account?{" "}
        <Link href="/register" variant="body2">
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
