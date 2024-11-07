import adminModel from "../../model/adminModel.js";

export const adminDashboard = async (req, res) => {
  const { id, role } = req.user;
  if (!(role == "admin")) {
    return res.status(401).json({
      success: false,
      message: "UnAuthorized!!!",
    });
  }
  try {
    const adminUser = await adminModel.findOne({
      _id: id,
    });

    if (!adminUser) {
      return res.status(401).json({
        success: false,
        message: "UnAuthorized!!!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Authorized successfully!!!",
      adminUser,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "failed to authorize!!!",
    });
  }
};
