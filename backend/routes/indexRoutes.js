import express from "express";
const router = express.Router();
import adminRoute from "./adminRoutes.js";
// import { signin } from "../controller/admin/signin.js";

router.use("/admin", adminRoute);
// router.post("/signin", signin);

export default router;
