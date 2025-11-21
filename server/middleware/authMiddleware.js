const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;
  // check token exists
  if (req.cookies.token) {
    try {
      token = req.cookies.token;
      // compare token with JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token fail" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
