import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select, FormHelperText, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material";

const AddApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "",
    date: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData((prevState) => ({ ...prevState, status: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company || !formData.position || !formData.status || !formData.date) {
      setSnackbarMessage("Please fill in all fields and ensure the date is valid.");
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/applications", formData);
      setSnackbarMessage("Application added successfully!");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/applications");
      }, 1500);
    } catch {
      setSnackbarMessage("Failed to add application. Please try again.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.9)", // White with slight transparency
        borderRadius: 4,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Application
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleTextFieldChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleTextFieldChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleSelectChange}
            required
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Accepted">Accepted</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
          <FormHelperText>Choose the current status of your application</FormHelperText>
        </FormControl>
        <TextField
          fullWidth
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleTextFieldChange}
          required
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Application
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default AddApplication;
