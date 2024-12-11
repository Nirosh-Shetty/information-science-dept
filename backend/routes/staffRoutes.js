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
  getAttendanceHistory,
  deleteAttendance,
  studentListWithAttendance,
  saveOrUpdateAttendance,
  studentListForNewAttendance,
} from "../controller/staff/attendance.js";
import jwtMiddleware from "../middleware/jwtMiddleware.js";
import {
  createQuiz,
  deleteByQuizId,
  UpdateQuizQuestion,
  getQuizTitlesByClass,
  getQuestionsByQuizTitle,
} from "../controller/staff/manageQuiz.js";
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

// Attendance
router.post("/getAttendanceHistory", jwtMiddleware, getAttendanceHistory);
router.delete("/attendanceList/:id", deleteAttendance);
router.get("/studentListWithAttendance/:id", studentListWithAttendance);
router.post("/saveOrUpdateAttendance/:type", saveOrUpdateAttendance);
router.post("/studentListForNewAttendance", studentListForNewAttendance);

//quiz
router.post("/createQuiz", createQuiz);
router.put("/updateQuizQuestion", UpdateQuizQuestion);
router.delete("/deleteQuizQuestion/:quizId", deleteByQuizId);
router.get("/getQuizzesByClass/:classId", getQuizTitlesByClass);
router.get("/getQuestionsByQuizTitle/:title", getQuestionsByQuizTitle);

export default router;
