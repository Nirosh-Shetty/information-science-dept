import express from "express";
const app = express();
// import adminModel from "../model/adminModel";
import adminModel from "../../model/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminSigin = async (req, res) => {
  console.log("admin sigin hitted");
  const { identifier, passowrd } = req.body;
  try {
    const user = await adminModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const comPassword = await bcrypt.compare(passowrd, user.passowrd);
    if (!comPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    const jwtPayload = {
      id: user._id,
      role: "admin",
      iat: Math.floor(Date.now() / 1000),
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    return res.status(201).json({
      success: true,
      message: "Admin Signed In Successfully",
      token,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Failed to SignIn",
    });
  }
};
