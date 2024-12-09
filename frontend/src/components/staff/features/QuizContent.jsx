import { useState, useEffect } from "react";
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
import { classAtom } from "../../../../recoil/atoms/classAtom";
import { staffAtom } from "../../../../recoil/atoms/staffAtom";

export default function QuizContent() {
  const [currentUser] = useRecoilState(staffAtom);
  const [classes] = useRecoilState(classAtom);

  const [quizMessage, setQuizMessage] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizTitles, setQuizTitles] = useState([]);
  const [currentSelectedClass, setCurrentSelectedClass] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [quizId, setQuizId] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  // Handle class selection
  const handleValueChange = (value) => {
    const selectedClass = classes.find((item) => item._id === value);
    setCurrentSelectedClass(selectedClass);
  };

  // Fetch quiz titles based on selected class
  const fetchQuizTitles = async () => {
    if (!currentSelectedClass) return;

    try {
      const response = await axios.get(
        `${BACKEND_URL}/staff/getQuizzesByClass/${currentSelectedClass._id}`
      );
      response.data.title && setQuizTitles(response.data.title);
    } catch (error) {
      console.error("Error fetching quiz titles:", error);
    }
  };

  // Fetch questions for a selected quiz title
  const fetchQuizQuestions = async (title) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/staff/getQuestionsByQuizTitle/${title}`
      );
      setQuizQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  };

  // Handle dialog open/close
  const handleCreateQuizClick = () => {
    setIsEdit(false);
    resetDialogFields();
    setQuizId(uuidv4());
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetDialogFields();
  };

  const resetDialogFields = () => {
    setQuizMessage("");
    setTitle("");
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setEditIndex(null);
  };

  // Add or edit a question
  const handleAddQuestion = () => {
    const endpoint = isEdit
      ? `${BACKEND_URL}/staff/updatequizquestion`
      : `${BACKEND_URL}/staff/createQuiz`;

    const payload = {
      quizId,
      title,
      question,
      options,
      correctAnswer,
      classId: currentSelectedClass?._id,
      staffId: currentUser?._id,
    };

    const axiosMethod = isEdit ? axios.put : axios.post;

    axiosMethod(endpoint, payload)
      .then((response) => {
        if (isEdit) {
          const updatedQuestions = [...quizQuestions];
          console.log(response.data)
          updatedQuestions[editIndex] = response.data.UpdateQuizQuestion;
          setQuizQuestions(updatedQuestions);
        } else {
          setQuizQuestions((prev) => [
            ...prev,
            { question, options, correctAnswer },
          ]);
        }
        setQuizMessage("Question saved successfully!");
        handleCloseDialog();
      })
      .catch((error) => {
        setQuizMessage(error.response?.data?.message || error.message);
      });
  };

  // Edit a question
  const handleEditQuestion = (index, quizId) => {
    setQuizId(quizId);
    const questionToEdit = quizQuestions[index];
    setEditIndex(index);
    setIsEdit(true);
    setTitle(selectedTitle);
    setQuestion(questionToEdit.question);
    setOptions(questionToEdit.options);
    setCorrectAnswer(questionToEdit.correctAnswer);
    setOpenDialog(true);
  };

  // Delete a question
  const handleDeleteQuestion = async (index, quizId) => {
    console.log(quizId)
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/staff/deleteQuizQuestion/${quizId}`
      );
      if (response.data.deletedQuestion) {
        const updatedQuestions = quizQuestions.filter((_, i) => i !== index);
        setQuizQuestions(updatedQuestions);
      }
    } catch (error) {
      console.error("Error deleting quiz question:", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  useEffect(() => {}, [currentSelectedClass]);

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
                      {index + 1}. {q?.question}
                    </Typography>
                    {q?.options.map((option, idx) => (
                      <Typography key={idx} variant="body2">
                        {`${String.fromCharCode(65 + idx)}. ${option}`}
                      </Typography>
                    ))}
                    <Typography>
                      Correct Answer: <strong>{q?.correctAnswer}</strong>
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditQuestion(index, q?.quizId)}
                      sx={{ mx: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteQuestion(index, q?.quizId)}
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