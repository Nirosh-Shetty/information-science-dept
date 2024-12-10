import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { notify } from "../../../../toastMessage/NotifyMessage";
import { BACKEND_URL } from "../../../../../../globals";
import axios from "axios";

const Delete = ({ quiz, questions, setQuestions, questionId }) => {
  return (
    <DeleteIcon
      onClick={() => {
        const response = axios.delete(
          `${BACKEND_URL}/quiz/deletequestion/${quiz._id}/${questionId}`,
          { questions: questions }
        );
        response.then((res) => {
          if (res.status === 200) {
            const newQuestions = questions.filter(
              (question, index) => question._id !== questionId
            );
            setQuestions(newQuestions);
            notify("Question deleted successfully");
          } else {
            notify("Failed to delete questions");
          }
        });
      }}
    />
  );
};

export default Delete;
