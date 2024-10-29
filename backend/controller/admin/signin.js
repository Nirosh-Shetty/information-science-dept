import express from "express";
const app = express();
// import adminModel from "../model/adminModel";

export const adminSigin = async (req, res) => {
  console.log("admin sigin hitted");
  try {
    res.json({
      message: "admin hitted",
    });
  } catch (error) {}
};
