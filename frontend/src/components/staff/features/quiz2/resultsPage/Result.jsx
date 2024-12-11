import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"; // Import required Chart.js elements
import axios from "axios";
import { BACKEND_URL } from "../../../../../../globals";

// Register Chart.js elements and plugins
ChartJS.register(ArcElement, Tooltip, Legend);

const Result = ({ quiz, currentSelectedCourse }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [chartData, setChartData] = useState(null);

  const handleClickOpen = async () => {
    try {
      // Fetch quiz results
      const quizResponse = await fetch(`${BACKEND_URL}/quiz/results/${quiz._id}`);
      const quizResults = await quizResponse.json();

      // Fetch student data
      const response = await axios.get(`${BACKEND_URL}/student/get`, {
        params: { className: currentSelectedCourse.className },
      });
      const students = response.data;

      setQuizData(quizResults);
      setStudentData(students);

      // Calculate completed and incompleted students
      const completedCount = quizResults?.results?.length || 0;
      const incompletedCount = students.length - completedCount;

      setChartData({
        labels: ["Completed", "Incomplete"],
        datasets: [
          {
            data: [completedCount, incompletedCount],
            backgroundColor: ["#b491c8", "#53207c"],
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setQuizData(null);
    setChartData(null);
  };

  const chartOptions = {
    maintainAspectRatio: false, // Disable the default aspect ratio
    plugins: {
      legend: {
        position: "bottom", // Position the legend
      },
    },
  };

  return (
    <>
      <Button
        variant="text"
        color="success"
        onClick={handleClickOpen}
        sx={{
          borderRadius: "8px",
          "&:hover": { backgroundColor: "#defade" },
        }}
      >
        Results
      </Button>

      {/* Dialog for displaying quiz results */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "70%", // Adjust the width as per your needs
            maxWidth: "none", // Ensures the width is not constrained
          },
        }}
      >
        <DialogTitle>Quiz Results For {quiz.title}</DialogTitle>
        <DialogContent>
          {chartData ? (
            <div style={{ marginBottom: "100px", width: "300px", height: "300px"}}>
              <Typography variant="h6" gutterBottom>
                Quiz Completion Analysis
              </Typography>
              <Pie data={chartData} options={chartOptions} />
            </div>
          ) : (
            <Typography variant="body2">Loading analysis...</Typography>
          )}

          {quizData ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>USN</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizData?.results?.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.student.name}</TableCell>
                      <TableCell>{result.student.usn}</TableCell>
                      <TableCell>
                        {result.attempts[0]?.score || 0} / {quiz.random}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2">Loading results...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Result;
