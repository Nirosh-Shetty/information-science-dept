import express from "express";
const router = express.Router();
import multer from "multer";
import { createEvent, deleteEvent, getEventById, getEvents, getStudentsByStudentId, getStudentsRegistered, registerStudent, updateEvent } from "../controller/event/manageEvent.js";
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define your upload folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed (jpeg, jpg, png)"));
    }
  },
});

router.post("/add", upload.single("image"), createEvent);
router.put("/update/:id", upload.single("image"), updateEvent);
router.delete("/delete/:id", deleteEvent);
router.get("/get", getEvents);
router.get("/get/:id", getEventById);
router.get("/registered/:eventid", getStudentsRegistered);
router.post("/register/:eventid/", registerStudent);
router.get("/getbystudent/:studentId/:eventId", getStudentsByStudentId);


export default router;