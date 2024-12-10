import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  IconButton,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { BACKEND_URL } from "../../../../../globals"; // Ensure BACKEND_URL is correctly imported
import EditPage from "./editPage/EditPage";
import axios from "axios";
import { notify } from "../../../toastMessage/NotifyMessage";
import Delete from "./deletePage/Delete";

const EditDetails = ({ quiz, setQuizzes }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddQuestionDialog, setOpenAddQuestionDialog] = useState(false); // State for Add Question dialog
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState();
  const [newQuestion, setNewQuestion] = useState({
    questionName: "",
    options: ["", "", "", ""], // Assuming there are 4 options
    correctAnswer: "",
  });
  const updateQuestion = (questionId, updatedQuestion) => {
    // Update the question in the questions state or make an API call to update the backend
    const updatedQuestions = questions?.map((question) =>
      question._id === questionId
        ? { ...question, ...updatedQuestion }
        : question
    );
    setQuestions(updatedQuestions);
  };

  // Fetch questions by quiz._id
  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/quiz/getquestionsbyquizid/${quiz._id}`
      );
      const data = await response.json();
      console.log(data);
      setQuestionId(data.id);
      setQuestions(data.questions); // Assuming the response is an array of questions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleDeleteQuestion = (questionId) => {
    console.log(`Delete question ${questionId}`);
    // Implement delete logic (e.g., call API to delete question)
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setOpenAddQuestionDialog(false);
  };

  const handleNewQuestionChange = (e, field) => {
    setNewQuestion({ ...newQuestion, [field]: e.target.value });
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = e.target.value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  return (
    <div>
      <Button
        variant="text"
        color="primary"
        onClick={() => {
          fetchQuestions();
          setOpenDialog(true);
        }} // Open the dialog and fetch questions
        sx={{
          borderRadius: "8px",
          "&:hover": { backgroundColor: "#dfe6fd" },
        }}
      >
        Edit Details
      </Button>

      {/* Dialog to edit quiz details */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            padding: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "primary.main",
            paddingBottom: 0,
          }}
        >
          Edit Questions for {quiz.title}
        </DialogTitle>
        <DialogContent sx={{ paddingY: 2 }}>
          <List>
            {questions?.map((question, i) => (
              <ListItem
                key={question._id}
                divider
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
                  mb: 2,
                  padding: 2,
                }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                  {/* Question Content */}
                  <div>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "500",
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      {i + 1}. {question.questionName}
                    </Typography>
                    <div>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: "text.secondary",
                          mb: 1,
                        }}
                      >
                        Options:
                      </Typography>
                      <ul style={{ marginLeft: "1rem", listStyleType: "disc" }}>
                        {question.options.map((option, index) => (
                          <li key={index} style={{ marginTop: "0.5rem" }}>
                            {option}
                          </li>
                        ))}
                      </ul>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 2,
                          color: "text.secondary",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          Correct Answer:
                        </span>{" "}
                        {question.correctAnswer}
                      </Typography>
                    </div>
                  </div>

                  {/* Edit and Delete Buttons */}
                  <div
                    style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
                  >
                    <EditPage
                      question={question}
                      updateQuestion={updateQuestion}
                    />
                    <IconButton
                      onClick={() => handleDeleteQuestion(question._id)}
                      sx={{
                        color: "error.main",
                      }}
                    >
                      <Delete questions={questions} setQuestions={setQuestions} quiz={quiz} questionId={question._id} />
                    </IconButton>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            padding: 3,
          }}
        >
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              color: "#FFFFFF", // Pure white for text
              bgcolor: "#374151", // Muted dark gray background
              "&:hover": {
                bgcolor: "#4B5563", // Slightly lighter gray for hover
              },
              paddingX: 3,
              paddingY: 1.2,
              borderRadius: "8px", // Smooth edges
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
              border: "1px solid rgba(255, 255, 255, 0.1)", // Thin border for structure
            }}
          >
            Close
          </Button>

          <Button
            onClick={() => setOpenAddQuestionDialog(true)}
            sx={{
              color: "white",
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
              paddingX: 3,
              paddingY: 1,
              borderRadius: 2,
            }}
          >
            Add Question
          </Button>
          <Button
            onClick={() => {
              const response = axios.put(
                `${BACKEND_URL}/quiz/updateQuestionsByQuizId/${quiz._id}/`,
                { questions: questions }
              );
              response.then((res) => {
                if (res.status === 200) {
                  setOpenDialog(false);
                  notify("Questions updated successfully");
                } else {
                  notify("Failed to update questions");
                }
              });
            }}
            sx={{
              color: "white",
              bgcolor: "#4ADEDE", // Vibrant aqua color
              "&:hover": {
                bgcolor: "#3ACBCC", // Slightly darker shade for hover effect
              },
              paddingX: 3,
              paddingY: 1.2,
              borderRadius: "8px", // Rounded corners for a modern look
              boxShadow: "0px 4px 10px rgba(74, 222, 222, 0.4)", // Matching shadow for subtle depth
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to add a new question */}
      <Dialog
        open={openAddQuestionDialog}
        onClose={() => setOpenAddQuestionDialog(false)}
      >
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Question Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newQuestion.questionName}
            onChange={(e) => handleNewQuestionChange(e, "questionName")}
          />
          <div className="mt-3">
            {newQuestion.options.map((option, index) => (
              <TextField
                key={index}
                label={`Option ${index + 1}`}
                variant="outlined"
                fullWidth
                className="my-2"
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
              />
            ))}
          </div>
          <FormControl fullWidth className="mt-3">
            <InputLabel>Correct Answer</InputLabel>
            <Select
              value={newQuestion.correctAnswer}
              label="Correct Answer"
              onChange={(e) => handleNewQuestionChange(e, "correctAnswer")}
            >
              {newQuestion.options.map((option, optionIndex) => (
                <MenuItem key={optionIndex} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenAddQuestionDialog(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleAddQuestion} color="primary">
            Add Question
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditDetails;
