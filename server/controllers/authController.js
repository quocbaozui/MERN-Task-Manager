const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // tìm user trong db với email
    const userExit = await User.findOne({ email });

    // Nếu user đã tồn tại chưa
    if (userExit) {
      return res.status(400).json({ message: "User already exits" });
    }

    // Lệnh này gọi xuống MongoDB để tạo bản ghi mới.
    const user = await User.create({ username, email, password });

    if (user) {
      const token = generateToken(user._id); // id do mongoose tự tạo
      res.cookie("token", token, {
        httpOnly: true, // chống hack XSS
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // cookie sống trong 1 giờ
      });
      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      });
      res.json({ id: user.id, email: user.email, username: user.username });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logoutUser = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};

exports.getUserProfile = async (req, res) => {
  try {
    // req.user._id => kết quả của Auth Middleware
    // select(-password) lấy tất cả các thông tin trừ password
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
