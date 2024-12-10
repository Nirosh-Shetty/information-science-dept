import * as React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { classAtom } from "../../../../../recoil/atoms/classAtom";
import { staffAtom } from "../../../../../recoil/atoms/staffAtom";
import axios from "axios";
import { BACKEND_URL } from "../../../../../globals";
import { AddQuiz } from "./AddQuiz";
import { useTheme } from "@mui/material/styles";
import DeleteQuiz from "./DeleteQuiz";
import EditDetails from "./EditDetails";
import { ToastContainer } from "react-toastify";
import Result from "./resultsPage/Result";

export function QuizContent2() {
  const [staff] = useRecoilState(staffAtom);
  const [classes] = useRecoilState(classAtom);
  const [currentSelectedCourse, setCurrentSelectedCourse] = React.useState();
  const [quizzes, setQuizzes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const theme = useTheme(); // Access the current theme (light/dark)

  // Fetch quizzes for the selected class
  const handleValueChange = async (event) => {
    const selectedClass = classes.find((item) => item._id === event.target.value);
    setCurrentSelectedCourse(selectedClass);

    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_URL}/quiz/getByClassId/${event.target.value}`
      );
      setQuizzes(response.data); // Assuming the API returns an array of quizzes
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
      setLoading(false);
    }
  };


  // Render loading or quizzes
  const renderQuizzes = () => {
    if (loading) return <CircularProgress />;

    if (quizzes.length === 0)
      return (
        <Typography variant="body1" color="text.secondary">
          No quizzes available for this class.
        </Typography>
      );

    return (
      <Grid container>
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz._id}>
            <Card
              sx={{
                marginBottom: 2,
                maxWidth: 345,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                },
                background: theme.palette.mode === "dark" ? "#333" : "linear-gradient(145deg, #ffffff, #f0f0f0)",
                borderRadius: "16px",
                color: theme.palette.mode === "dark" ? "#fff" : "#333",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#333", fontWeight: "bold" }}
                >
                  {quiz.title}
                </Typography>
                <Typography variant="body2" color={theme.palette.text.secondary}>
                  Available: {quiz.isAvailable ? "Yes" : "No"}
                </Typography>
                <Typography variant="body2" color={theme.palette.text.secondary}>
                  Due Date: {new Date(quiz.dueDate).toLocaleString()}
                </Typography>
                <Box sx={{ marginTop: 2, display: "flex", gap: 2 }}>
                  <EditDetails quiz={quiz} setQuizzes={setQuizzes}></EditDetails>
                  <DeleteQuiz quiz={quiz} setQuizzes={setQuizzes}></DeleteQuiz>
                  <Result quiz={quiz} currentSelectedCourse={currentSelectedCourse}></Result>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ padding: 4, background: theme.palette.background.default }}>
      {/* Class Selector */}
      <ToastContainer></ToastContainer>
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

      {/* Add Quiz Button */}
      {currentSelectedCourse && (
        <Box sx={{ marginBottom: 4 }}>
          <AddQuiz
            currentSelectedCourse={currentSelectedCourse}
            setQuizzes={setQuizzes}
            quizzes={quizzes}
          />
        </Box>
      )}

      {/* Quiz Cards */}
      <Box>{renderQuizzes()}
        <ToastContainer></ToastContainer>
      </Box>
    </Box>
  );
}
