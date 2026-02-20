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
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    applicationDate: "",
    status: "",
    notes: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("🚨 No token found, redirecting to login...");
          navigate("/login");
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/job-applications/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("❌ Error fetching application details:", error);
        setSnackbarMessage("Failed to fetch application details.");
        setSnackbarOpen(true);
      }
    };
    if (id) fetchApplication();
  }, [id, navigate]);

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

    if (
      !formData.company ||
      !formData.role ||
      !formData.status ||
      !formData.applicationDate
    ) {
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
      // console.log("🔥🔥🔥" + formData);

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/job-applications/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setSnackbarMessage("Application updated successfully!");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/applications"), 1500);
    } catch (error) {
      console.error("❌ Error updating application:", error);
      setSnackbarMessage("Failed to update application.");
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
        Edit Application
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
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleSelectChange}
            required
          >
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="INTERVIEWING">INTERVIEWING</MenuItem>
            <MenuItem value="OFFERED">OFFERED</MenuItem>
            <MenuItem value="REJECTED">REJECTED</MenuItem>
          </Select>
          <FormHelperText>
            Choose the current status of your application
          </FormHelperText>
        </FormControl>
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
        <Button variant="contained" color="primary" type="submit">
          Update Application
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

export default EditApplication;
