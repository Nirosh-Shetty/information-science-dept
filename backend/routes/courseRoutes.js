import express from "express";
import { addCourse, deleteCourseByClassName, getAllCourses, getCourseByClass, updateCourseById } from "../controller/courses/manageCourses.js";
const router = express.Router();

router.post("/add", addCourse);
router.get("/get", getCourseByClass);
router.get("/getall", getAllCourses);
router.put("/update", updateCourseById);
router.delete("/delete", deleteCourseByClassName);

export default router;