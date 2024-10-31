import express from "express";
import adminModel from "../../model/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminSignIn = async (req, res) => {
  const { identifier, password } = req.body; 
  try {
    const user = await adminModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    // console.log(user);
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
      role: "admin",
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    // console.log(token);
    return res.status(201).json({
      success: true,
      message: "Admin Signed In Successfully",
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
