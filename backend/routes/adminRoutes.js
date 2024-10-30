import express from "express";
import { adminSignIn } from "../controller/admin/signin.js";
const router = express.Router();

router.post("/signin", adminSignIn);

export default router;
