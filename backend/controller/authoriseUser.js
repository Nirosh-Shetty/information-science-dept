import adminModel from "../model/adminModel.js";
import staffModel from "../model/staffModel.js";
import studentModel from "../model/studentModel.js";

export const authorizeUser = async (req, res) => {
  const { id, role } = req.user;
  const reqRole = req.get("role");
  console.log(reqRole);
  if (!(role == reqRole)) {
    return res.status(401).json({
      success: false,
      message: "UnAuthorized!!!",
    });
  }
  const userModel =
    role == "admin" ? adminModel : role == "staff" ? staffModel : studentModel;
  try {
    const User = await userModel.findOne({
      _id: id,
    });
    // .exclude("password");
    // console.log(User);
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
      //TODO:
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "failed to authorize!!!",
    });
  }
};
