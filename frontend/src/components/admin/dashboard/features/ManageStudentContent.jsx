import { useState, useEffect } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { BACKEND_URL } from "../../../../../globals";
import { notify } from "../../../toastMessage/NotifyMessage";
import { ToastContainer } from "react-toastify";

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
  const [coursesDialogOpen, setCoursesDialogOpen] = useState(false);
  const [courses, setCourses] = useState([]); // List of courses
  const [editCourseIndex, setEditCourseIndex] = useState(null); // Index of course being edited
  const [newCourse, setNewCourse] = useState(""); // New course name
  const [editCourse, setEditCourse] = useState(""); // Edited course name
  const [newCourseCode, setNewCourseCode] = useState(""); // New course code
  const [editCourseCode, setEditCourseCode] = useState(""); // Edited course code

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
    password: "",
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
  const handleCoursesDialogOpen = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/courses/get/${selected}`
      );
      setCourses(response.data || []);
      setCoursesDialogOpen(true);
    } catch (error) {
      setCoursesDialogOpen(true);
      console.error("Error fetching courses:", error);
    }
  };

  // Close Courses Dialog
  const handleCoursesDialogClose = () => {
    setCoursesDialogOpen(false);
    setEditCourseIndex(null);
    setNewCourse("");
  };

  // Add New Course
  const handleAddCourse = async () => {
    if (!newCourse.trim() || !newCourseCode.trim()) return;
    try {
      const response = await axios.post(`${BACKEND_URL}/courses/add`, {
        className: selected,
        subCode: newCourseCode.trim(),
        name: newCourse.trim(),
      });
      
      if(response.data.message === "Class name already exists in the course.") {
        return 
      }
      setCourses([...courses, response.data.course]);
      setNewCourse("");
      setNewCourseCode("");
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Edit Existing Course
  const handleEditCourseSave = async () => {
    try {
      const response = await axios.put(`${BACKEND_URL}/courses/update`, {
        className: selected,
        subCode: editCourseCode.trim(),
        name: editCourse.trim(),
        id: courses[editCourseIndex]._id,
      });
      const updatedCourses = [...courses];
      updatedCourses[editCourseIndex] = response.data.newCourse || response.data.course;
      setCourses(updatedCourses);
      setEditCourseIndex(null);
      setEditCourse("");
      setEditCourseCode("");
    } catch (error) {
      console.error("Error editing course:", error);
    }
  };

  // Delete Course
  // Delete Course
const handleDeleteCourse = async (course) => {
  try {
    // Send DELETE request
    console.log(course + "2check");
    await axios.delete(`${BACKEND_URL}/courses/delete`, {
      data: {
        name: course.name,
        subCode: course.subCode,
        className: selected,
      },
    });

    setCourses(courses.filter((item) => item._id !== course._id));
  } catch (error) {
    console.error("Error deleting course:", error);
  }
};


  useEffect(() => {
    if (!selected) return;
    setCourses([]);
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
    console.log(newStudent, "newStudent");
    try {
      const response = await axios.post(`${BACKEND_URL}/student/add`, {
        fullName: newStudent.fullName,
        className: selected,
        usn: newStudent.usn,
        email: newStudent.email,
        password: newStudent.password
      });
      setData([...data, response.data.student]);
      setDialogOpen(false);
    } catch (error) {
      notify(error.message)
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
            <div className="flex gap-5">
              <Button
                variant="contained"
                onClick={handleDialogOpen}
                style={{ marginTop: 16 }}
              >
                Add Student
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={handleCoursesDialogOpen}
                style={{ marginTop: 16 }}
              >
                Courses
              </Button>
            </div>
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
          <ToastContainer></ToastContainer>
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
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              value={newStudent.password}
              onChange={(e) =>
                setNewStudent({ ...newStudent, password: e.target.value })
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
        {/* Courses Dialog */}
        <Dialog open={coursesDialogOpen} onClose={handleCoursesDialogClose}>
          <DialogTitle>Manage Courses</DialogTitle>
          <DialogContent>
            {/* Add New Course */}
            <TextField
              label="Subject Code"
              fullWidth
              margin="normal"
              value={newCourseCode}
              onChange={(e) => setNewCourseCode(e.target.value)}
            />
            <TextField
              label="Subject Name"
              fullWidth
              margin="normal"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCourse}
              disabled={!newCourse.trim() || !newCourseCode.trim()}
              style={{ marginBottom: "16px" }}
            >
              Add Course
            </Button>
            <Divider />
            {/* Courses List */}
            <Box mt={2}>
              <Typography variant="h6">Courses for {selected}:</Typography>
              <div>
                {courses.length === 0 && (
                  <Typography>No courses found for this class.</Typography>
                )}
              </div>
              {courses.map((course, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                >
                  {editCourseIndex === index ? (
                    <>
                      <TextField
                        label="Course Code"
                        fullWidth
                        margin="normal"
                        value={editCourseCode}
                        onChange={(e) => setEditCourseCode(e.target.value)}
                      />
                      <TextField
                        label="Course Name"
                        fullWidth
                        margin="normal"
                        value={editCourse}
                        onChange={(e) => setEditCourse(e.target.value)}
                      />
                    </>
                  ) : (
                    <Typography>
                      {course?.subCode} - {course?.name}
                    </Typography>
                  )}
                  <Box>
                    {editCourseIndex === index ? (
                      <>
                        <IconButton
                          color="primary"
                          onClick={handleEditCourseSave}
                          disabled={!editCourse.trim()}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setEditCourseIndex(null);
                            setEditCourse("");
                          }}
                        >
                          <CloseIcon></CloseIcon>
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <div>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setEditCourseIndex(index);
                              setEditCourse(course.name); // Set the course name for editing
                              setEditCourseCode(course.subCode); // Set the course code for editing
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              console.log("TOCHECK" + course);
                              handleDeleteCourse(course);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCoursesDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
