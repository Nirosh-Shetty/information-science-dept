import express from "express";
import { createQuiz, deleteQuestion, deleteQuiz, getQuestionsByQuizId, getQuizById, getQuizzes, getQuizzesByClassId, updateQuestion, updateQuiz, updateQuizQuestionsByQuizId } from "../controller/quiz2/manageQuiz.js";
import { getRemainingTime, getResults, startQuiz, submitQuiz } from "../controller/quiz2/manageSubmission.js";
const router = express.Router();

router.post("/add", createQuiz);
router.get("/get/:id", getQuizById);
router.get("/getall", getQuizzes);
router.get("/getByClassId/:classId", getQuizzesByClassId);
router.get("/getquestionsbyquizid/:quizId", getQuestionsByQuizId);
router.put("/update/:id", updateQuiz);
router.put("/updatequestion/:quizId/:questionId", updateQuestion)
router.put("/updateQuestionsByQuizId/:quizId", updateQuizQuestionsByQuizId)
router.delete("/delete/:id", deleteQuiz)
router.delete("/deletequestion/:quizId/:questionId", deleteQuestion)

//submission

router.post("/submit", submitQuiz);
router.post("/start", startQuiz);
router.get("/remaining/:quizId/:studentId", getRemainingTime);
router.get("/results/:quizId", getResults);

export default router;