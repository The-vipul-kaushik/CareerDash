import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Snackbar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material";

const EditApplication = () => {
  const { id } = useParams(); // Get application ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "",
    date: "",
  });

  const [error, setError] = useState<string | null>(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch the application data to pre-fill the form
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/applications/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch application details. Please try again.");
      }
    };
    if (id) fetchApplication();
  }, [id]);

  // Handle form input changes for TextField components
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle Select change (for Status dropdown)
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData((prevState) => ({ ...prevState, status: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/applications/${id}`, formData);
      setSnackbarMessage("Application updated successfully!");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/applications"), 2000);
    } catch (err) {
      setError("Failed to update application. Please try again.");
    }
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        Edit Application
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

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
          Update Application
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default EditApplication;
