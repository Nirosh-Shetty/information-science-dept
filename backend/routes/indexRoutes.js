import express from "express";
const router = express.Router();
import adminRoute from "./adminRoutes.js";
import studentrRoute from "./studentRoutes.js";

router.use("/admin", adminRoute);
router.use("/student", studentrRoute);

export default router;
