import express from "express";
import {
  addStaff,
  deleteStaffById,
  getAllStaff,
  getStaff,
  getStaffById,
  updateStaffById,
} from "../controller/staff/manageStaff.js";
import {
  addAssignment,
  deleteAssignment,
  getAllAssignments,
  getAssignmentsByClassName,
  updateAssignment,
} from "../controller/staff/assignment.js";
import { getAttendanceList } from "../controller/staff/getAttendanceList.js";

import { createQuiz, deleteByQuizId, getQuestionsByQuizTitle,getQuizTitlesByClass, UpdateQuizQuestion} from "../controller/staff/manageQuiz.js";
const router = express.Router();

router.post("/add", addStaff);
router.get("/get", getStaff);
router.get("/getById", getStaffById);
router.put("/update", updateStaffById);
router.delete("/delete", deleteStaffById);
router.get("/allstaff", getAllStaff);

// Assignment
router.post("/addAssignment/:employeeId", addAssignment);
router.put("/updateAssignment/:_id", updateAssignment);
router.delete("/deleteAssignment/:_id", deleteAssignment);
router.get("/assignments", getAllAssignments);
router.get("/assignments/class/:className", getAssignmentsByClassName);

//Attendance
router.post("/getAttendanceList", getAttendanceList);

// Quiz Routes
router.post("/createQuiz", createQuiz);
router.get('/getQuizzesByClass/:classId', getQuizTitlesByClass);
router.get('/getQuestionsByQuizTitle/:title', getQuestionsByQuizTitle);
router.put('/updatequizquestion', UpdateQuizQuestion);
router.delete('/deleteQuizQuestion/:quizId',deleteByQuizId);

//try using dynamic routing if needed
export default router;
