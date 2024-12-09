import React, { useState } from "react";
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EditPage = ({ question, updateQuestion }) => {
  // State to manage the dialog box
  const [open, setOpen] = useState(false);
  
  // State for the question details that will be edited
  const [editedQuestion, setEditedQuestion] = useState({
    questionName: question.questionName,
    options: [...question.options], // Making a copy of the options array
    correctAnswer: question.correctAnswer,
  });

  // Handle change for the question name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedQuestion({ ...editedQuestion, [name]: value });
  };

  // Handle change for options
  const handleOptionChange = (e, index) => {
    const updatedOptions = [...editedQuestion.options];
    updatedOptions[index] = e.target.value;
    setEditedQuestion({ ...editedQuestion, options: updatedOptions });
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Handle saving the edited question
  const handleSave = () => {
    // Call the function passed as a prop to update the question
    updateQuestion(question._id, editedQuestion);
    handleClose();
  };


  return (
    <div>
      <IconButton onClick={() => setOpen(true)} color="primary">
        <EditIcon />
      </IconButton>

      {/* Dialog to edit question details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <TextField
            label="Question Name"
            fullWidth
            value={editedQuestion.questionName}
            onChange={handleChange}
            name="questionName"
            margin="normal"
          />
          {editedQuestion.options.map((option, index) => (
            <TextField
              key={index}
              label={`Option ${index + 1}`}
              fullWidth
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
              margin="normal"
            />
          ))}
          
          {/* Select component for correct answer */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Correct Answer</InputLabel>
            <Select
              value={editedQuestion.correctAnswer}
              onChange={handleChange}
              name="correctAnswer"
              label="Correct Answer"
            >
              {editedQuestion.options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPage;
