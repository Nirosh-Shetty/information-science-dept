import React, { useState } from "react";
import axios  from "axios";
// import { classAtom } from "../../../../recoil/atoms/classAtom";
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
} from "@mui/material";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRecoilState } from "recoil";
import {
  classAtom,
  currentSelectedClass as currentSelectedClassAtom,
} from "../../../../recoil/atoms/classAtom";
import {staffAtom} from "../../../../recoil/atoms/staffAtom"

export default function QuizContent() {
  const [currentUser, setcurrentUser]=useRecoilState(staffAtom)
  const [quizMessage,setQuizMessage]=useState("")
  const [classes] = useRecoilState(classAtom);
  const [currentSelectedClass, setCurrentSelectedClass] = useRecoilState(
    currentSelectedClassAtom
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleValueChange = (value) => {
    console.log(value)
    const selectedClass = classes.find((item) => item._id === value);
    console.log(selectedClass)
    setCurrentSelectedClass(selectedClass);
  };

  const handleCreateQuizClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  console.log(currentUser)

  const handleSubmitQuiz = () => {
    console.log(currentUser)
    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }
  
    axios
      .post(`${BACKEND_URL}/staff/createQuiz`, {
        question,
        options,
        correctAnswer,
        classId: currentSelectedClass?._id,
        staffId: currentUser._id, // Ensure currentUser is defined
      })
      .then((response) => {
        const { data } = response;
        console.log("Quiz created successfully:", data.message);
        setQuizMessage("Question added successfully! you can add more questions")
        setCorrectAnswer("")
        setOptions(["","","","",""])
        setQuestion("")
      })
      .catch((error) => {
        setQuizMessage(error.response?.data?.message || error.message)
        console.error("Error creating quiz:", error.response?.data?.message || error.message);
      });
  };
  
  
  

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <div className="w-8/9 my-5">
      {/* Select Dropdown */}
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

      {/* Conditional Rendering based on selected class */}
      {currentSelectedClass && (
        <Grid container spacing={3} mt={4}>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => console.log("Existing Quizzes")}
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

      {/* Dialog for Creating Quiz */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Create a New Quiz</DialogTitle>
        <DialogContent>
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
          <p>{quizMessage}</p>
          <Button onClick={()=>{
            handleCloseDialog()
            setQuizMessage("")
          }} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmitQuiz} variant="contained" color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
