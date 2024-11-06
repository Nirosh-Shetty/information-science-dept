import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MenuItem,
  Select,
  Chip,
  Typography,
  Divider,
  ListSubheader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import { BACKEND_URL } from "../../../../../globals";

const StyledTableContainer = styled(TableContainer)({
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #ddd",
  marginTop: "16px",
});

const StyledSelect = styled(Select)({
  width: 240,
  maxHeight: 240,
  overflow: "auto",
});

export default function StudentSection() {
  const [selected, setSelected] = useState(""); // Changed to store just section like "2 ISE1"
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editDetails, setEditDetails] = useState({
    usn: "",
    fullName: "",
    email: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    usn: "",
    fullName: "",
    email: "",
  });
  const [deleteUSN, setDeleteUSN] = useState("");

  const yearGroups = {
    "2nd Year": ["2 ISE1", "2 ISE2"],
    "3rd Year": ["3 ISE1", "3 ISE2"],
    "4th Year": ["4 ISE1", "4 ISE2"],
  };

  const customColors = {
    "3rd Year": { backgroundColor: "#E5D9F2", color: "#333" },
    "4th Year": { backgroundColor: "#D2E0FB", color: "#333" },
  };

  // Fetch students based on selected class
  useEffect(() => {
    if (!selected) return;

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/student/get`, {
          params: { className: selected }, // Use 'params' to pass query parameters in GET request
        });
        if (response.data.message === "No students found for this class.") {
          setData([]);
        } else {
          setData(response.data);
        }
      } catch (error) {
        setData([]);
        console.error("Error fetching students :", error);
      }
    };

    fetchStudents();
  }, [selected]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value); // Store only the section value like "2 ISE1"
  };

  const handleDialogOpen = () => {
    setNewStudent({ usn: "", fullName: "", email: "" });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSave = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/student/add`, {
        fullName: newStudent.fullName,
        className: selected,
        usn: newStudent.usn,
        email: newStudent.email,
      });
      setData([...data, response.data.student]);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleEditOpen = (index) => {
    setEditIndex(index);
    setEditDetails(data[index]);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/student/update`,
        editDetails
      );
      const updatedData = [...data];
      updatedData[editIndex] = response.data.student;
      setData(updatedData);
      setEditDialogOpen(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteOpen = (USN) => {
    setDeleteUSN(USN);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/student/delete`, {
        data: { usn: deleteUSN },
      });
      setData(data.filter((item) => item.usn !== deleteUSN));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const renderValue = (selected) => {
    if (!selected) return "Select Year and Section"; // Placeholder when nothing is selected
  
    const [year, section] = selected.split(" - ");
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Chip for Year */}
        <Chip
          size="small"
          label={year}
          sx={{
            backgroundColor: customColors[year]?.backgroundColor,
            color: customColors[year]?.color,
            marginRight: 1,
          }}
        />
        {/* Chip for Section */}
        <Typography variant="body1">{section}</Typography>
      </div>
    );
  };
  
  const renderOptions = () => {
    const options = [];
    Object.entries(yearGroups).forEach(([year, sections], index) => {
      if (index !== 0) options.push(<Divider key={`divider-${index}`} />);
      options.push(
        <ListSubheader key={`header-${year}`} disableSticky>
          {`${year} (${sections.length})`}
        </ListSubheader>
      );
      sections.forEach((section) => {
        // Create a new format like "2nd Year - 2 ISE2"
        const value = `${year} - ${section}`;
        options.push(
          <MenuItem key={value} value={value}>
            {selected === value && (
              <CheckIcon fontSize="small" style={{ marginRight: 8 }} />
            )}
            {/* Chip for Year */}
            <Chip
              size="small"
              label={year}
              sx={{
                backgroundColor: customColors[year]?.backgroundColor,
                color: customColors[year]?.color,
                marginRight: 1,
              }}
            />
            {section}
          </MenuItem>
        );
      });
    });
    return options;
  };
  

  return (
    <div>
      <Box p={1}>
        <StyledSelect
          displayEmpty
          value={selected}
          onChange={handleChange}
          renderValue={renderValue}
        >
          {renderOptions()}
        </StyledSelect>

        {selected ? (
          <div>
            <Button
              variant="contained"
              onClick={handleDialogOpen}
              style={{ marginTop: 16 }}
            >
              Add Student
            </Button>
            <StyledTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>USN</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={row.usn}>
                      <TableCell>{row.usn}</TableCell>
                      <TableCell>{row.fullName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditOpen(index)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteOpen(row.usn)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </div>
        ) : (
          <div
            style={{
              height: "15em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ fontSize: "1.3em" }}>
              Select any Class and Section to display data
            </h1>
          </div>
        )}

        {/* Add Student Dialog */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>
            <TextField
              label="USN"
              fullWidth
              margin="normal"
              value={newStudent.usn}
              onChange={(e) =>
                setNewStudent({ ...newStudent, usn: e.target.value })
              }
            />
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={newStudent.fullName}
              onChange={(e) =>
                setNewStudent({ ...newStudent, fullName: e.target.value })
              }
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({ ...newStudent, email: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogSave}>Save</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Student Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
            <TextField
              label="USN"
              fullWidth
              margin="normal"
              value={editDetails.usn}
              onChange={(e) =>
                setEditDetails({ ...editDetails, usn: e.target.value })
              }
            />
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={editDetails.fullName}
              onChange={(e) =>
                setEditDetails({ ...editDetails, fullName: e.target.value })
              }
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={editDetails.email}
              onChange={(e) =>
                setEditDetails({ ...editDetails, email: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Student Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this student?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
