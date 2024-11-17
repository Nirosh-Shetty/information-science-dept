import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing!",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing!",
      });
    }
    const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    // console.log("Decoded User:", user);

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(401).json({
      success: false,
      message: "Forbidden!!! Invalid or expired token.",
    });
  }
};

export default jwtMiddleware;
