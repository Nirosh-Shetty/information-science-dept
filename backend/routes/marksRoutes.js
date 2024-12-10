import express from "express";
import { createMarks, getMarksByStudentId, getMarksBySubAndStudId } from "../controller/marks/manageMarks.js";
const router = express.Router();

router.post("/add", createMarks);
router.get("/getbyId/:studentId", getMarksByStudentId );
router.get("/get/:studentId/:subjectId", getMarksBySubAndStudId);
router.put("/update", );
router.delete("/delete", );

export default router;