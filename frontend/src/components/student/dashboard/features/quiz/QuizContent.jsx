import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { studentClassAtom } from "../../../../../../recoil/atoms/classAtom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { BACKEND_URL } from "../../../../../../globals";
import { studentAtom } from "../../../../../../recoil/atoms/studentAtom";
import StartQuizButton from "./starButton/QuizStartButton"; // Import the new StartQuizButton component

export const QuizContent = () => {
  const [student] = useRecoilState(studentAtom); // Student from Recoil state
  const [classes] = useRecoilState(studentClassAtom); // Classes from Recoil state
  const [currentSelectedCourse, setCurrentSelectedCourse] = useState(null); // Store selected class
  const [quizzes, setQuizzes] = useState([]); // Store quizzes for the selected class
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch quizzes by classId using axios
  const fetchQuizzes = async (classId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/quiz/getByClassId/${classId}`
      );
      setQuizzes(response.data); // Update quizzes state
    } catch (error) {
      toast.error("Failed to fetch quizzes. Please try again later.");
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle class selection
  const handleValueChange = (event) => {
    const selectedClassId = event.target.value;
    const selectedClass = classes.find((cls) => cls._id === selectedClassId);
    setCurrentSelectedCourse(selectedClass);
    fetchQuizzes(selectedClassId); // Fetch quizzes for the selected class
  };

  return (
    <div>
      <ToastContainer />

      {/* Class Selection */}
      <FormControl fullWidth sx={{ marginBottom: 4 }}>
        <InputLabel id="class-select-label">Select Class</InputLabel>
        <Select
          labelId="class-select-label"
          id="class-select"
          value={currentSelectedCourse ? currentSelectedCourse._id : ""}
          label="Select Class"
          onChange={handleValueChange}
        >
          {classes.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name} {item.className}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display Quizzes */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <Card
              key={quiz._id}
              sx={{
                width: "calc(33.33% - 20px)",
                marginBottom: 2,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {quiz.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "gray" }}>
                  Due Date: {new Date(quiz.dueDate).toLocaleString()}
                </Typography>
                <Typography
                  sx={{
                    color: quiz.isAvailable ? "green" : "red",
                    fontWeight: 500,
                  }}
                >
                  {quiz.isAvailable ? "Available" : "Not Available"}
                </Typography>
              </CardContent>
              {quiz.isAvailable && (
                <div className="p-3">
                  <StartQuizButton quizId={quiz._id} studentId={student._id} />
                </div>
              )}
            </Card>
          ))
        ) : (
          <Typography>No quizzes available for the selected class.</Typography>
        )}
      </div>
    </div>
  );
};
