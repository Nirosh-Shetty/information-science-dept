import express from "express";
import { adminSigin } from "../controller/admin/signin.js";
const router = express.Router();

router.post("/signin", adminSigin);

export default router;
