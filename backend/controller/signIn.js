import adminModel from "../model/adminModel.js";
import staffModel from "../model/staffModel.js";
import studentModel from "../model/studentModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import insertData from "./insertSampleData.js";

export const signIn = async (req, res) => {
  const { identifier, password, role } = req.body;
  // insertData();
  const userModel =
    role == "admin" ? adminModel : role == "staff" ? staffModel : studentModel;
  try {
    const user = await userModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    console.log(user);
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
      role: role,
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    // console.log(token);

    return res.status(201).json({
      success: true,
      message: "Signed In Successfully",
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
