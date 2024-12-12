import express from "express";
import {
  addStudent,
  deleteStudentByUsn,
  getAllStudents,
  getStudentsByClass,
  updateStudentByUsn,
} from "../controller/student/manageStudent.js";
import { getAttendanceData } from "../controller/student/getAttendanceData.js";
const router = express.Router();

router.post("/add", addStudent);
router.get("/get", getStudentsByClass);
router.put("/update", updateStudentByUsn);
router.delete("/delete", deleteStudentByUsn);
router.get("/allstudents", getAllStudents);
router.get("/getAttendanceData/:studentId", getAttendanceData);

export default router;
