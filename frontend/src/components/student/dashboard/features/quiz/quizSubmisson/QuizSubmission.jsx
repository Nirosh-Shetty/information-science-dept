import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../../../../../../../globals";
import { Loading } from "./components/Loading";
import { QuizNotFound } from "./components/QuizNotFound";
import { Submit } from "./components/Submit";
import { Completed } from "./components/Completed";
import { useTheme } from "@mui/material/styles";

// Inside your component

export const QuizSubmission = () => {
  const theme = useTheme();

  const { quizId, studentId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState();
  const [isCompleted, setIsCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission status

  // Function to handle submit button click and open dialog
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  // Function to handle confirmation and submit quiz
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true); // Set submitting state to true
    await handleSubmit(); // Call the handleSubmit function when confirmed
    setIsSubmitting(false); // Reset submitting state
    setOpenDialog(false); // Close dialog after submission
  };

  const startQuiz = async () => {
    try {
      await axios.post(`${BACKEND_URL}/quiz/start`, { quizId, studentId });
    } catch (error) {
      console.error(
        "Error starting quiz:",
        error.response?.data?.message || error.message
      );
      if (
        error.response?.data?.message === "Quiz has already been completed."
      ) {
        setIsCompleted(true);
      }
      toast.error("Failed to start the quiz. Please try again.");
    }
  };

  useEffect(() => {
    if (isCompleted) {
      return;
    }

    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/quiz/get/${quizId}`);
        const fetchedQuiz = response.data;
        let previousQuestions = JSON.parse(
          localStorage.getItem("selectedQuestions")
        );
        let storedAnswers = JSON.parse(localStorage.getItem("selectedAnswers"));

        if (previousQuestions) {
          setQuestions(previousQuestions);
          setQuiz(fetchedQuiz);
          setTimeLeft(fetchedQuiz.time * 60);
          setLoading(false);
          startQuiz();
          if (storedAnswers) {
            setAnswers(storedAnswers);
          }
          return;
        }

        const shuffledQuestions = [...fetchedQuiz.questions].sort(
          () => Math.random() - 0.5
        );
        const selectedQuestions = shuffledQuestions.slice(
          0,
          fetchedQuiz.random
        );

        localStorage.setItem(
          "selectedQuestions",
          JSON.stringify(selectedQuestions)
        );
        setQuestions(selectedQuestions);
        setQuiz(fetchedQuiz);
        setTimeLeft(fetchedQuiz.time * 60);
        setLoading(false);
        startQuiz();

        if (storedAnswers) {
          setAnswers(storedAnswers);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        toast.error("Failed to load quiz. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, isCompleted]);

  useEffect(() => {
    if (isCompleted) {
      localStorage.removeItem("selectedQuestions");
      localStorage.removeItem("selectedAnswers");
    }
  }, [isCompleted]);

  useEffect(() => {
    const fetchRemainingTime = async () => {
      try {
        const response = await axios.get(`
          ${BACKEND_URL}/quiz/remaining/${quizId}/${studentId}`);
        setTimeLeft(response.data.remainingTime); // Time already in seconds
      } catch (error) {
        console.error("Error fetching remaining time:", error);
        toast.error("Failed to fetch remaining time.");
      }
    };

    if (!submitted) {
      fetchRemainingTime();
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          handleSubmit(); // Auto-submit when timer reaches 0
          return 0;
        }
        return prevTime - 1; // Decrement by 1 second
      });
    }, 1000); // Update every second

    return () => clearInterval(timerInterval); // Cleanup timer on component unmount
  }, [quizId, studentId, submitted]);

  const handleAnswerChange = (questionId, selectedAnswer) => {
    // Update the answers in state
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers, [questionId]: selectedAnswer };
      // Store the updated answers in localStorage
      localStorage.setItem("selectedAnswers", JSON.stringify(newAnswers));
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        quizId,
        studentId,
        answers: Object.keys(answers).map((questionId) => ({
          questionId,
          answer: answers[questionId],
        })),
      };

      const response = await axios.post(`${BACKEND_URL}/quiz/submit`, payload);
      toast.success("Quiz submitted successfully!");
      setScore(response.data.score);
      setSubmitted(true);
      localStorage.removeItem("selectedQuestions");
      localStorage.removeItem("selectedAnswers");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit the quiz. Please try again.");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!quiz) {
    return <QuizNotFound />;
  }

  if (submitted) {
    return <Submit score={score} />;
  }

  if (isCompleted) {
    return <Completed />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      <Card
        sx={{
          width: "100%",
          maxWidth: "800px",
          marginBottom: "16px",
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            {quiz.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#757575" }}>
            Due Date: {new Date(quiz.dueDate).toLocaleString()}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#757575" }}>
            Class: {quiz.classId.name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ marginTop: 2, color: "#ff5722" }}
          >
            Time Left: {Math.floor(timeLeft / 60)} minutes {timeLeft % 60}{" "}
            seconds
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: "100%",
          maxWidth: "800px",
          marginBottom: "16px",
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ marginBottom: 2, fontWeight: "bold", color: "#333" }}
          >
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, color: "#555" }}>
            {currentQuestion.questionName}
          </Typography>
          <RadioGroup
            value={answers[currentQuestion._id] || ""}
            onChange={(e) =>
              handleAnswerChange(currentQuestion._id, e.target.value)
            }
          >
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          sx={{
            backgroundColor:
              theme.palette.mode === "dark" ? "#1976d2" : "#1976d2",
            color: theme.palette.mode === "dark" ? "#fff" : "#fff",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1565c0" : "#1565c0",
            },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
          sx={{
            backgroundColor:
              theme.palette.mode === "dark" ? "#1976d2" : "#1976d2",
            color: theme.palette.mode === "dark" ? "#fff" : "#fff",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1565c0" : "#1565c0",
            },
          }}
        >
          Next
        </Button>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        disabled={Object.keys(answers).length !== questions.length}
        sx={{
          width: "100%",
          maxWidth: "800px",
          padding: "12px",
          fontWeight: "bold",
          backgroundColor:
            theme.palette.mode === "dark" ? "#1976d2" : "#1976d2",
          color: theme.palette.mode === "dark" ? "#fff" : "#fff",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark" ? "#1565c0" : "#1565c0",
          },
        }}
      >
        Submit Quiz
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to submit the quiz? Once submitted, you cannot
            change your answers.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
