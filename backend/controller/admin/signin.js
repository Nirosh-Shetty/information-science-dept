import express from "express";
const app = express();
import adminModel from "../../model/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminSignIn = async (req, res) => {
  const { identifier, password } = req.body; 
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

    console.log(user); // Consider removing in production
    const comPassword = await bcrypt.compare(password, user.password); // Corrected 'user.passowrd' to 'user.password'

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
    console.error(error); // Log error for debugging
    return res.status(500).json({
      // Changed from 501 to 500
      success: false,
      message: "Failed to Sign In",
    });
  }
};
