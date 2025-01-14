import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post("/api/login", {
    //     email,
    //     password,
    //   });
    //   // Store the JWT token in localStorage or sessionStorage
    //   localStorage.setItem("token", response.data.token);
    //   navigate("/dashboard");
    // } catch (error) {
    //   setError("Invalid credentials. Please try again.");
    // }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2, backgroundColor: "rgba(255, 255, 255, 0.9)"}}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
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
