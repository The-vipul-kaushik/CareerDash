import React, { useState, useEffect, useCallback } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit Icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios"; // Import axios for making HTTP requests

const ApplicationList = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control snackbar visibility

  // Fetch applications data from json-server
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/applications");
        setApplications(response.data);
        setFilteredApplications(response.data); // Initialize with all data
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };

    fetchApplications();
  }, []);

  // Filter function to match company, position, or status
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);

      // Filter applications based on the search query
      const filtered = applications.filter(
        (app) =>
          app.company.toLowerCase().includes(query) ||
          app.position.toLowerCase().includes(query) ||
          app.status.toLowerCase().includes(query)
      );
      setFilteredApplications(filtered);
    },
    [applications] // Dependency array ensures handleSearch changes only when `applications` changes
  );

  // Handle delete application
  const handleDelete = async () => {
    if (selectedAppId !== null) {
      try {
        await axios.delete(`http://localhost:5000/applications/${selectedAppId}`);
        setApplications((prevApps) => prevApps.filter((app) => app.id !== selectedAppId)); // Remove the deleted application from the list
        setFilteredApplications((prevApps) => prevApps.filter((app) => app.id !== selectedAppId)); // Remove from filtered list
        setOpenDeleteDialog(false); // Close dialog after deletion
        setOpenSnackbar(true); // Open snackbar to show success message
      } catch (error) {
        console.error("Error deleting application", error);
      }
    }
  };

  // Handle page change
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Open delete confirmation dialog
  const openDeleteConfirmation = (id: number) => {
    setSelectedAppId(id);
    setOpenDeleteDialog(true);
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedAppId(null);
  };

  // Close snackbar after a delay
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Application List
      </Typography>

      <TextField
  label="Search by Company, Status, or Position"
  variant="outlined"
  fullWidth
  value={searchQuery}
  onChange={handleSearch}
  sx={{
    marginBottom: 2,
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  }}
/>


      <TableContainer component={Paper} sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)"
        }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell> {/* Add Actions header */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Implement pagination
              .map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>
                    {/* Link to Edit Application page */}
                    <Link to={`/edit-application/${app.id}`}>
                      <IconButton color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    {/* Delete Application */}
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => openDeleteConfirmation(app.id)} // Show delete confirmation
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredApplications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Application</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this application?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Application deleted successfully!" // Use simple message here
      />
    </Box>
  );
};

export default ApplicationList;
