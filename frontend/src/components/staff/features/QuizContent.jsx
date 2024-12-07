import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { BACKEND_URL } from "../../../../globals";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRecoilState } from "recoil";
import {
  classAtom,
  currentSelectedCourse as currentSelectedCourseAtom,
} from "../../../../recoil/atoms/classAtom";

export default function QuizContent() {
  const [classes, setClasses] = useRecoilState(classAtom);
  const [currentSelectedCourse, setCurrentSelectedCourse] = useRecoilState(
    currentSelectedCourseAtom
  );
  const handleValueChange = (value) => {
    console.log(value);
    const selectedClass = classes.find((item) => item._id === value);
    setCurrentSelectedCourse(selectedClass);
  };
  React.useEffect(() => {}, [currentSelectedCourse]);

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Class Selection */}
      <Select className="w-full" onValueChange={handleValueChange}>
        <SelectTrigger className="text-xl p-5 text-gray-600 font-semibold dark:text-gray-100 dark:border-2">
          <SelectValue placeholder="Select a Class" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="text-2xl">
            <SelectLabel>Class</SelectLabel>
            {classes.map((item) => (
              <SelectItem key={item._id} value={item._id}>
                {`${item.name} - ${item.className}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {currentSelectedClass && (
        <Grid container spacing={2} mt={4}>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={fetchQuizTitles}
              sx={{
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              View Existing Quizzes
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleCreateQuizClick}
              sx={{
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Create New Quiz
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Quiz Titles */}
      {quizTitles.length > 0 && (
        <Box my={5}>
          <Select
            className="w-full"
            onValueChange={async (value) => {
              setSelectedTitle(value);
              try {
                const response = await axios.get(`${BACKEND_URL}/staff/getQuestionsByQuizTitle/${value}`);
                setQuizQuestions(response.data.questions);
              } catch (error) {
                console.error("Error fetching quiz questions:", error);
              }
            }}
          >
            <SelectTrigger className="text-xl p-5 text-gray-600 font-semibold dark:text-gray-100 dark:border-2">
              <SelectValue placeholder="Select a Quiz Title" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="text-2xl">
                <SelectLabel>Quiz Titles</SelectLabel>
                {quizTitles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {quizQuestions.length > 0 && (
            <Box class>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quiz Questions:
              </Typography>
              {quizQuestions.map((q, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {index + 1}. {q.question}
                    </Typography>
                    {q.options.map((option, idx) => (
                      <Typography key={idx} variant="body2">
                        {`${String.fromCharCode(65 + idx)}. ${option}`}
                      </Typography>
                    ))}
                    <Typography>
                      Correct Answer: <strong>{q.correctAnswer}</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditQuestion(index, q.quizId)}
                      sx={{ mx: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteQuestion(index, q.quizId)}
                      sx={{ mx: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}

      {/* Dialog for Adding/Editing Questions */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {isEdit?
        <DialogTitle>Edit Quiz Question</DialogTitle>:<DialogTitle>Create Quiz Question</DialogTitle>}
        <DialogContent>
          <TextField
            label="Quiz Title*"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            label="Quiz Question*"
            fullWidth
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={{ my: 2 }}
          />
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Options
          </Typography>
          {options.map((option, index) => (
            <TextField
              key={index}
              label={`Option ${index + 1}*`}
              fullWidth
              variant="outlined"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              sx={{ mb: 2 }}
            />
          ))}
          <TextField
            label="Correct Answer*"
            fullWidth
            variant="outlined"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleAddQuestion} variant="contained" color="secondary">
            Add
          </Button>
          <Button onClick={() => handleSubmitQuiz()} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
