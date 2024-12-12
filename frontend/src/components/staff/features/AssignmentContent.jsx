import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  useTheme,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState } from "recoil";
import { staffAtom } from "../../../../recoil/atoms/staffAtom";
import { classAtom } from "../../../../recoil/atoms/classAtom";
import { BACKEND_URL } from "../../../../globals";
import axios from "axios";
import { assignmentAtom } from "../../../../recoil/atoms/assignmentAtom";
import { format } from "date-fns";

const AssignmentContent = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false); // Modal state for adding/editing assignments
  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    classes: {
      className: "",
      subName: "",
    },
    description: "",
  });

  const [assignmentDetails, setAssignmentDetails] = useState(null); // To store selected assignment details
  const [studentsSubmitted, setStudentsSubmitted] = useState([]);
  const [studentsPending, setStudentsPending] = useState([]);
  const [viewStudents, setViewStudents] = useState(false); // Modal state for viewing student details
  const [studentType, setStudentType] = useState("");
  const [classes, setClasses] = useRecoilState(classAtom);
  const [staff, setStaff] = useRecoilState(staffAtom);
  const [assignments, setAssignments] = useRecoilState(assignmentAtom);
  const [allAssignment, setAllAssignment] = useState();
  React.useEffect(() => {
    const fetchAllAssignments = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/staff/assignments`);
        const data = await response.json();
        console.log(data, "dddd");
        setAllAssignment(data);
        console.log(allAssignment, "JJJJ");
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchAllAssignments();
  }, [staff]);

  React.useEffect(() => {
    if (allAssignment?.length > 0 && staff?.assignment) {
      const filteredAssignments = allAssignment.filter((assignment) =>
        staff.assignment.includes(assignment._id)
      );
      setAssignments(filteredAssignments);
    }
  }, [allAssignment, staff]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.id) {
      // Update existing assignment
      axios
        .put(`${BACKEND_URL}/staff/updateAssignment/${formData.id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            const updatedAssignment = res.data.updatedAssignment; // Ensure this matches your backend response
            setAssignments(
              assignments.map((assignment) =>
                assignment._id === formData.id
                  ? { ...assignment, ...updatedAssignment }
                  : assignment
              )
            );
            console.log("Assignment updated successfully:", updatedAssignment);
            handleClose();
          } else {
            console.error("Failed to update assignment:", res.status);
          }
        })
        .catch((error) => {
          console.error("Error updating assignment:", error);
        });
    } else {
      // Add new assignment
      axios
        .post(
          `${BACKEND_URL}/staff/addAssignment/${staff.employeeId}`,
          formData
        )
        .then((res) => {
          setAssignments([
            ...assignments,
            { ...res.data.assignment, id: res.data.assignment._id },
          ]);
          setStaff({
            ...staff,
            assignment: [...staff.assignment, res.data.assignment._id],
          });
          console.log(res.data.assignment);
          handleClose();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // Reset form data and close the dialog
    setFormData({
      id: "",
      title: "",
      description: "",
      dueDate: "",
      classes: {
        className: "",
        subName: "",
      },
    });
  };

  const handleAssignmentClick = (assignment) => {
    // Mock student data for the selected assignment
    setAssignmentDetails(assignment);
    setStudentsSubmitted(["Alice", "Bob"]);
    setStudentsPending(["Charlie", "Diana"]);
  };

  const handleStudentListOpen = (type) => {
    setStudentType(type);
    setViewStudents(true);
  };

  const handleStudentListClose = () => {
    setViewStudents(false);
  };

  const handleEditAssignment = (assignment) => {
    setFormData({
      title: assignment.title,
      dueDate: assignment.dueDate,
      description: assignment.description,
      classes: {
        className: assignment.classes.className,
        subName: assignment.classes.subName,
      },
      id: assignment._id,
      // Include the id for updating the existing assignment
    });
    setOpen(true); // Open the dialog to edit the assignment
  };

  const handleDeleteAssignment = async (id) => {
    const data = await axios.delete(
      `${BACKEND_URL}/staff/deleteAssignment/${id}`
    );
    console.log(data, "hjhhjjjh");
    setStaff({
      ...staff,
      assignment: staff.assignment.filter((assignment) => assignment !== id),
    });
    if (data.status == 200) {
      setAssignments(assignments.filter((assignment) => assignment._id !== id));
    }
  };

  console.log(assignmentDetails, "ssssssssssss");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{
            my: 1,
            bgcolor: "#1a73e8",
            color: "#fff",
            "&:hover": { bgcolor: "#1669bb" },
          }}
        >
          Add Assignment
        </Button>
      </div>

      {/* Assignments Table */}
      <TableContainer
        component={Paper}
        className="shadow-md"
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
            <TableRow>
              <TableCell className="font-bold">
                <strong>Title</strong>
              </TableCell>
              <TableCell className="font-bold">
                <strong>Description</strong>
              </TableCell>
              <TableCell className="font-bold">
                <strong>Due Date</strong>
              </TableCell>
              <TableCell className="font-bold">
                <strong>Class</strong>
              </TableCell>
              <TableCell className="font-bold">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow
                key={assignment.id}
                hover
                onClick={() => handleAssignmentClick(assignment)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.description}</TableCell>
                <TableCell>
                  {assignment?.dueDate
              ? format(new Date(assignment.dueDate), "dd MMM yyyy")
                    : "No Due Date"}
                </TableCell>
                <TableCell>
                  {assignment.classes.className} {assignment.classes.subName}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click event
                      handleEditAssignment(assignment);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click event
                      handleDeleteAssignment(assignment._id);
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

      {/* Add/Edit Assignment Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {formData.id ? "Edit Assignment" : "Add New Assignment"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            className="mb-4"
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            value={formData.description}
            onChange={handleChange}
            className="mb-4"
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            name="dueDate"
            fullWidth
            value={formData.dueDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-4"
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Class</InputLabel>
            <Select
              value={formData.classes.className ? formData.classes : ""}
              name="class"
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedClass = classes.find((c) => c._id === selectedId);
                if (selectedClass) {
                  setFormData({
                    ...formData,
                    classes: {
                      className: selectedClass.className[0],
                      subName: selectedClass.name,
                    },
                  });
                }
              }}
              renderValue={(selected) => {
                if (selected?.className && selected?.subName) {
                  return `${selected.className} ${selected.subName}`;
                }
                return "Select Class";
              }}
            >
              {classes.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {`${course.className} ${course.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="text-gray-500">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Assignment Details Dialog */}
      <Dialog
        open={!!assignmentDetails}
        onClose={() => setAssignmentDetails(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{assignmentDetails?.title} Details</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Class: {assignmentDetails?.class}
          </Typography>
          <Typography variant="subtitle1">
            Description: {assignmentDetails?.description}
          </Typography>
          <Typography variant="subtitle1">
            Due Date:{" "}
            {assignmentDetails?.dueDate
              ? format(new Date(assignmentDetails.dueDate), "dd MMM yyyy")
              : "No Due Date"}
          </Typography>
          <div className="flex gap-4 mt-4">
            <Chip
              label={`Submitted: ${studentsSubmitted.length}`}
              variant="outlined"
              color="success" // Use MUI's 'success' palette for a green chip
              onClick={() => handleStudentListOpen("Submitted")}
              style={{ cursor: "pointer" }}
            />
            <Chip
              label={`Pending: ${studentsPending.length}`}
              variant="outlined"
              color="error" // Use MUI's 'error' palette for a red chip
              onClick={() => handleStudentListOpen("Pending")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAssignmentDetails(null)}
            className="text-gray-500"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Student List Dialog */}
      <Dialog
        open={viewStudents}
        onClose={handleStudentListClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{`${studentType} Students`}</DialogTitle>
        <DialogContent>
          <List>
            {(studentType === "Submitted"
              ? studentsSubmitted
              : studentsPending
            ).map((student, index) => (
              <ListItem key={index}>
                <ListItemText primary={student} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStudentListClose} className="text-gray-500">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AssignmentContent;
