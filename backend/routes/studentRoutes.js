import express from "express";
import { addStudent, deleteStudentByUsn, getStudentsByClass, updateStudentByUsn } from "../controller/student/manageStudent.js";
const router = express.Router();

router.post("/add", addStudent);
router.get("/get", getStudentsByClass);
router.put("/update", updateStudentByUsn);
router.delete("/delete", deleteStudentByUsn);

export default router;
