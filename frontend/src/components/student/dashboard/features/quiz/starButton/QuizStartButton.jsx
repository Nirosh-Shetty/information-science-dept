import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StartQuizButton = ({ quizId, studentId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    navigate(`/quiz/${quizId}/${studentId}`);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Start Quiz
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Start Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to start the quiz? Once started, you cannot go back or change your answers after submission.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant='contained'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StartQuizButton;
