import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  Menu,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../../../globals";

const StyledTableContainer = styled(TableContainer)({
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #ddd",
  marginTop: "16px",
});

const ManageStaffContent = () => {
  const [staffList, setStaffList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    employeeId: "",
    designation: "",
    email: "",
    password: "",
    courses: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleClick = (event, staffId) => {
    setAnchorEl(event.currentTarget);
    setSelectedStaff(staffId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedStaff(null);
  };

  const handleAddStaff = async () => {
    try {
      if (editMode) {
        const { password, ...formDataWithoutPassword } = formData;
        await axios.put(`${BACKEND_URL}/staff/update`, {
          ...formDataWithoutPassword,
          id: selectedStaffId,
        });
        setStaffList(
          staffList.map((staff) =>
            staff.employeeId === selectedStaffId
              ? { ...formData, employeeId: selectedStaffId }
              : staff
          )
        );
      } else {
        const response = await axios.post(`${BACKEND_URL}/staff/add`, formData);
        setStaffList([...staffList, response.data.staff]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error adding/updating staff:", error);
      setError("Error adding or updating staff. Please try again.");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/courses/getall`);
        console.log(response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/staff/get`);
        setStaffList(response.data);
        console.log(staffList +"Staffdatafetched");
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
    fetchStaffData()
  }, []);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormData({
      name: "",
      username: "",
      employeeId: "",
      designation: "",
      email: "",
      password: "",
      courses: [],
    });
    setEditMode(false);
    setError("");
  };

  const handleEditStaff = (staff) => {
    setFormData(staff);
    setSelectedStaffId(staff.employeeId);
    setEditMode(true);
    handleOpenForm();
  };

  const handleDeleteStaff = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/staff/delete/`, {
        params: { id: selectedStaffId },
      });
      setStaffList(
        staffList.filter((staff) => staff.employeeId !== selectedStaffId)
      );
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  return (
    <Box p={1}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleOpenForm}
      >
        Add Staff
      </Button>

      <StyledTableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Emp Id</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffList.map((staff) => (
              <TableRow key={staff.employeeId}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.employeeId}</TableCell>
                <TableCell>{staff.designation}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>
                  <Button
                    aria-controls={`course-menu-${staff.employeeId}`}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, staff.employeeId)}
                  >
                    View Courses
                  </Button>
                  <Menu
                    id={`course-menu-${staff.id}`}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedStaff === staff.employeeId}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    {staff.courses.map((courseId) => {
                      const course = courses.find((c) => c._id === courseId);
                      return (
                        <MenuItem
                          key={courseId}
                          style={{ padding: "8px 16px" }}
                        >
                          {course
                            ? `${course.subCode} ${course.name} ${course.className}`
                            : "Unknown Course"}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </TableCell>

                <TableCell align="">
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditStaff(staff)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedStaffId(staff.employeeId);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Add/Edit Staff Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{editMode ? "Edit Staff" : "Add Staff"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            variant="outlined"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <TextField
            disabled={editMode}
            margin="dense"
            label="Emp Id"
            fullWidth
            variant="outlined"
            value={formData.employeeId}
            onChange={(e) =>
              setFormData({ ...formData, employeeId: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Designation"
            fullWidth
            variant="outlined"
            value={formData.designation}
            onChange={(e) =>
              setFormData({ ...formData, designation: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {!editMode && (
            <TextField
              margin="dense"
              label="Password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          )}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Courses</InputLabel>
            <Select
              multiple
              value={formData.courses}
              onChange={(e) =>
                setFormData({ ...formData, courses: e.target.value })
              }
              renderValue={(selected) =>
                selected
                  .map((courseId) => {
                    const course = courses.find((c) => c._id === courseId);
                    return course ? `${course.subCode} ${course.name} ${course.className}` : "Unknown Course";
                  })
                  .join(", ")
              }
            >
              {courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  <Checkbox
                    checked={formData.courses.includes(course._id)}
                  />
                  <ListItemText primary={`${course.subCode} ${course.name} ${course.className}`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleAddStaff} color="primary">
            {editMode ? "Save Changes" : "Add Staff"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this staff member?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteStaff} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageStaffContent;
