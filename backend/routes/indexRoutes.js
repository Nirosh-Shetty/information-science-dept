import express from "express";
const router = express.Router();
import adminRoute from "./adminRoutes.js";
import studentrRoute from "./studentRoutes.js";
import staffRoute from "./staffRoutes.js";

router.use("/admin", adminRoute);
router.use("/student", studentrRoute);
router.use("/staff", staffRoute);

export default router;
