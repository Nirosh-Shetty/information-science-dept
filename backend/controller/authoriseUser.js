import adminModel from "../model/adminModel.js";
import staffModel from "../model/staffModel.js";
import studentModel from "../model/studentModel.js";

export const authorizeUser = async (req, res) => {
  const { id, role } = req.user;
  const reqRole = req.get("role");

  if (!(role === reqRole)) {
    return res.status(401).json({
      success: false,
      message: "UnAuthorized!!!",
    });
  }

  const userModel =
    role === "admin"
      ? adminModel
      : role === "staff"
      ? staffModel
      : studentModel;

  try {
    let query = userModel.findOne({ _id: id }).select("-password");

    // Conditionally populate courses if the role is staff
    if (role === "staff") {
      query = query.populate("courses", "name _id");
    }

    const User = await query.exec();

    if (!User) {
      return res.status(401).json({
        success: false,
        message: "UnAuthorized!!!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Authorized successfully!!!",
      User,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Failed to authorize!!!",
    });
  }
};
