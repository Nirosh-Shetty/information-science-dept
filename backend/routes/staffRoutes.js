import express from "express";
import { addStaff, deleteStaffById, getStaff, getStaffById, updateStaffById } from "../controller/staff/manageStaff.js";
const router = express.Router();

router.post("/add", addStaff);
router.get("/get", getStaff);
router.get("/getById", getStaffById);
router.put("/update", updateStaffById);
router.delete("/delete", deleteStaffById);

export default router;
