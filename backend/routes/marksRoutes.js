import express from "express";
import { createMarks } from "../controller/marks/manageMarks";
const router = express.Router();

router.post("/add", createMarks);
router.get("/get", );
router.put("/update", );
router.delete("/delete", );

export default router;