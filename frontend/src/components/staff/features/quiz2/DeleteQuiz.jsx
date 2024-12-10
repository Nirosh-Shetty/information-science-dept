import { Button } from "@mui/material";
import React from "react";
import { notify } from "../../../toastMessage/NotifyMessage";
import axios from "axios";
import { BACKEND_URL } from "../../../../../globals";

const DeleteQuiz = ({ quiz, setQuizzes }) => {
  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/quiz/delete/${quizId}`
      );
      if (response.status === 200) {
        notify("Quiz deleted successfully");
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz._id !== quizId)
        );
      }
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      notify("Failed to delete quiz");
    }
  };

  return (
    <div>
      <Button
        variant="text"
        color="error"
        onClick={() => handleDeleteQuiz(quiz._id)}
        sx={{
          borderRadius: "8px",
          "&:hover": { backgroundColor: "#fddede" },
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteQuiz;
