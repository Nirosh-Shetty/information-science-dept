import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import { classAtom } from "../../../../../recoil/atoms/classAtom";
import { staffAtom } from "../../../../../recoil/atoms/staffAtom";
import { BACKEND_URL } from "../../../../../globals";

const Marks = () => {
  const theme = useTheme();
  const [staff] = useRecoilState(staffAtom);
  const [classes] = useRecoilState(classAtom);
  const [currentSelectedCourse, setCurrentSelectedCourse] = React.useState("");
  const [students, setStudents] = React.useState([]);
  const [marks, setMarks] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleClassChange = async (event) => {
    const value = event.target.value;
    const selectedClass = classes.find((item) => item._id === value);
    setCurrentSelectedCourse(selectedClass || "");
    if (selectedClass) {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/student/get`, {
          params: selectedClass,
        });
        const fetchedStudents = response.data;
        setStudents(fetchedStudents);

        const marksData = {};
        for (const student of fetchedStudents) {
          try {
            const marksResponse = await axios.get(
              `${BACKEND_URL}/marks/get/${student._id}/${selectedClass._id}`
            );
            const studentMarks = marksResponse.data.data;
            if (studentMarks.length > 0) {
              marksData[student._id] = studentMarks[0].marks;
            }
          } catch (error) {
            console.error(`Error fetching marks for student ${student._id}:`, error);
          }
        }
        setMarks(marksData);
      } catch (error) {
        console.error("Error fetching students or marks:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMarkChange = (studentId, field, value) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSaveMarks = async () => {
    if (!currentSelectedCourse) {
      alert("Please select a course.");
      return;
    }

    try {
      const data = Object.keys(marks).map((studentId) => ({
        studentId,
        marks: {
          IA1: marks[studentId]?.IA1 || null,
          IA2: marks[studentId]?.IA2 || null,
          IA3: marks[studentId]?.IA3 || null,
        },
        subjectId: currentSelectedCourse._id,
        uploadedBy: staff._id,
      }));

      await axios.post(`${BACKEND_URL}/marks/add`, { marks: data });
      alert("Marks saved successfully!");
    } catch (error) {
      console.error("Error saving marks:", error);
      alert("Failed to save marks.");
    }
  };

  return (
    <Box sx={{ padding: 4, background: theme.palette.background.default }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="class-select-label">Select Class</InputLabel>
        <Select
          labelId="class-select-label"
          value={currentSelectedCourse ? currentSelectedCourse._id : ""}
          onChange={handleClassChange}
          label="Select Class"
        >
          {classes.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name} {item.className}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        students.length > 0 && (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>USN</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>IA1</TableCell>
                    <TableCell>IA2</TableCell>
                    <TableCell>IA3</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.usn}</TableCell>
                      <TableCell>{student.fullName}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={marks[student._id]?.IA1 || ""}
                          onChange={(e) =>
                            handleMarkChange(student._id, "IA1", e.target.value)
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={marks[student._id]?.IA2 || ""}
                          onChange={(e) =>
                            handleMarkChange(student._id, "IA2", e.target.value)
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={marks[student._id]?.IA3 || ""}
                          onChange={(e) =>
                            handleMarkChange(student._id, "IA3", e.target.value)
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSaveMarks}
            >
              Save Marks
            </Button>
          </>
        )
      )}
    </Box>
  );
};

export default Marks;
