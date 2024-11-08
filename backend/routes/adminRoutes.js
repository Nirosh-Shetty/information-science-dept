import express from "express";
import { adminSignIn } from "../controller/admin/adminSignIn.js";
import { adminDashboard } from "../controller/admin/dashboard.js";
import jwtMiddleware from "../middleware/jwtMiddleware.js";
import { updateProfile } from "../controller/admin/updateProfile.js";
const router = express.Router();

router.post("/signin", adminSignIn);
router.post("/dashboard", jwtMiddleware, adminDashboard);
router.put("/profile",jwtMiddleware, updateProfile)

export default router;
