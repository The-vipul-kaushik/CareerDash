import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

const AddApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    applicationDate: "",
    notes: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company || !formData.role || !formData.applicationDate) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("🚨 No token found, redirecting to login...");
        navigate("/login");
        return;
      }

      const dataToSend = {
        ...formData,
        status: "PENDING", // Default status
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/job-applications`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Application added:", response.data);

      setSnackbarMessage("Application added successfully!");
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/applications");
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("❌ Axios error:", err.response?.data || err.message);
      } else {
        console.error("❌ Unknown error:", err);
      }
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
        backgroundColor: "rgba(255, 255, 255, 0.9)",
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
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleTextFieldChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Date"
          name="applicationDate"
          type="date"
          value={formData.applicationDate}
          onChange={handleTextFieldChange}
          required
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Notes (Optional)"
          name="notes"
          value={formData.notes}
          onChange={handleTextFieldChange}
          multiline
          rows={3}
          sx={{ marginBottom: 2 }}
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