import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { staffAtom } from "../../../../../recoil/atoms/staffAtom";
import { classAtom } from "../../../../../recoil/atoms/classAtom";
import axios from "axios";
import { BACKEND_URL } from "../../../../../globals";
import { ToastContainer } from "react-toastify";
import { notify } from "../../../toastMessage/NotifyMessage";

export const AddQuiz = ({ currentSelectedCourse, setQuizzes }) => {
  const [staff] = useRecoilState(staffAtom);
  const [classes] = useRecoilState(classAtom);

  // State to manage dialog visibility and form data
  const [dueDate, setDueDate] = useState();
  const [open, setOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [time, setTime] = useState();
  const [random, setRandom] = useState();
  const [questions, setQuestions] = useState([
    { questionName: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  // Toggle dialog visibility
  const resetFields = () => {
    setRandom();
    setTime();
    setQuizTitle("");
    setDueDate("");
    setQuestions([
      { questionName: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetFields();
  };

  // Handle form field change for question text and options
  const handleFieldChange = (e, index, field) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionsChange = (e, index, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  // Add a new question to the list of questions
  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      { questionName: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleSubmit = async () => {
    // Ensure dueDate has a default time of 12:00:00 AM
    const formattedDate = new Date(dueDate);
    formattedDate.setHours(0, 0, 0, 0); // Set to 12:00:00 AM
    if (!dueDate) {
      notify("Please select a valid due date.");
      return;
    }
    const quizData = {
      random: random,
      time: time,
      title: quizTitle,
      classId: currentSelectedCourse._id,
      staffId: staff._id,
      questions: questions,
      isAvailable: true,
      dueDate: formattedDate.toISOString(), // Convert to ISO string for backend
    };

    try {
      await axios.post(`${BACKEND_URL}/quiz/add`, quizData).then((res) => {
        setOpen(false); // Close the dialog after submission
        setQuizzes((prevQuizzes) => [...prevQuizzes, res.data]); // Update the list of quizzes
        notify("Quiz created successfully!");
        resetFields();
      });
    } catch (error) {
      notify(`Failed to create quiz: ${error.message}`);
      console.error("Failed to create quiz:", error);
    }
  };

  return (
    <div>
      {currentSelectedCourse && (
        <div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Quiz
          </Button>
          <ToastContainer></ToastContainer>
        </div>
      )}

      {/* Dialog for adding a new quiz */}
      <Dialog open={open} onClose={handleClose}>
        <ToastContainer></ToastContainer>
        <DialogTitle>Create a New Quiz</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quiz Title"
            type="text"
            fullWidth
            variant="outlined"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true, // Keeps the label above the field when a date is selected
            }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Time (in minutes) for students to complete the quiz"
            type="number"
            fullWidth
            variant="outlined"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            label="No of Random Questions for students to attempt"
            type="number"
            fullWidth
            variant="outlined"
            value={random}
            onChange={(e) => setRandom(e.target.value)}
          />

          {questions.map((question, index) => (
            <Box key={index} className="mt-4">
              <TextField
                label={`Question ${index + 1}`}
                variant="outlined"
                fullWidth
                value={question.question}
                onChange={(e) => handleFieldChange(e, index, "questionName")}
              />

              <div className="mt-3">
                {question.options.map((option, optionIndex) => (
                  <TextField
                    key={optionIndex}
                    label={`Option ${optionIndex + 1}`}
                    variant="outlined"
                    fullWidth
                    className="my-2"
                    value={option}
                    onChange={(e) => handleOptionsChange(e, index, optionIndex)}
                  />
                ))}
              </div>

              <FormControl fullWidth className="mt-3">
                <InputLabel>Correct Answer</InputLabel>
                <Select
                  value={question.correctAnswer}
                  label="Correct Answer"
                  onChange={(e) => handleFieldChange(e, index, "correctAnswer")}
                >
                  {question.options.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}

          {/* Button to add a new question */}
          <Box className="mt-4">
            <Button
              variant="outlined"
              color="secondary"
              onClick={addNewQuestion}
            >
              Add More Questions
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Create Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
