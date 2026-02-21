import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ApplicationList = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplicationsData = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/job-applications`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        console.log("API response:", response.data);

        if (Array.isArray(response.data.data)) {
          setApplications(response.data.data);
          setFilteredApplications(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setApplications([]);
          setFilteredApplications([]);
        }
      } catch (err) {
        console.error("❌ Error fetching applications:", err);
        navigate("/login");
      }
    };
    fetchApplicationsData();
  }, [token, navigate]);

  const applyFilters = () => {
    let filtered = applications;
    if (searchQuery) {
      filtered = filtered.filter(
        (app) =>
          (app.company &&
            app.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (app.role &&
            app.role.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }
    setFilteredApplications(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, statusFilter, applications]);

  const handleDelete = async () => {
    if (selectedAppId !== null) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/job-applications/${selectedAppId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setApplications((prevApps) =>
          prevApps.filter((app) => app.id !== selectedAppId),
        );
        setOpenDeleteDialog(false);
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Error deleting application", error);
      }
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Application List
      </Typography>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          label="Search by Company or Role"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="INTERVIEWING">Interviewing</MenuItem>
            <MenuItem value="OFFERED">Offered</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>{app.role}</TableCell>
                  <TableCell>{app.applicationDate}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>
                    <Link to={`/edit-application/${app.id}`}>
                      <IconButton color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => {
                        setSelectedAppId(app.id);
                        setOpenDeleteDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredApplications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this application?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar for delete confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Application deleted successfully"
      />
    </Box>
  );
};

export default ApplicationList;
