import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res.status(401).json({
      success: false,
      message: "UnAuthorized!!!",
    });
  const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Forbidden!!!",
      });
    }
    req.user = user;
    next();
  });
};
