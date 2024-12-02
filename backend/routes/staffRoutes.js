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
import {
  deleteAttendance,
  getAttendanceHistory,
} from "../controller/staff/attendance.js";
import jwtMiddleware from "../middleware/jwtMiddleware.js";
import { createQuiz, deleteByQuizId, UpdateQuizQuestion, getQuizTitlesByClass } from "../controller/staff/manageQuiz.js";
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
router.post("/getAttendanceList", jwtMiddleware, getAttendanceHistory);
//try using dynamic routing if needed

router.delete("/attendanceList/:_id", deleteAttendance);

//quiz 

router.post("/staff/createQuiz",createQuiz)
router.post("/staff/updateQuizQuestion",UpdateQuizQuestion)
router.delete("/staff/deleteQuizQuestion/:quizId",deleteByQuizId)
router.get("/staff/getQuizzesByClass:/classId",getQuizTitlesByClass)
export default router;
