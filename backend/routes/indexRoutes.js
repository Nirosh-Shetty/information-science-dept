import express from "express";
const router = express.Router();
import adminRoute from "./adminRoutes.js";
router.use("/admin", adminRoute);

export default router;
