import express from "express";
const app = express();
import studentModel from "../../model/studentModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const StudentSignIn = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await studentModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const comPassword = await bcrypt.compare(password, user.password);
    if (!comPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const jwtPayload = {
      id: user._id,
      role: "student",
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "24h",
    });

    return res.status(201).json({
      success: true,
      message: "Student Signed In Successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Sign In",
    });
  }
};