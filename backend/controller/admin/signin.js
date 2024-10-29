import express from "express";
const app = express();
// import adminModel from "../model/adminModel";
import adminModel from "../../model/adminModel.js";
import bcrypt from "bcrypt";

export const adminSigin = async (req, res) => {
  console.log("admin sigin hitted");
  const { identifier, passowrd } = req.body();
  try {
    const user = await adminModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    const comPassword = await bcrypt.compare(passowrd, user.passowrd);
    if (!comPassword) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }

    return res.status(201).json({
      message: "Admin Signed In Successfully",
    });
  } catch (error) {
    return res.status(501).json({
      message: "Failed to SignIn",
    });
  }
};
