const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || "30d" });

// @POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const exists = await User.findOne({ email });
  if (exists) { res.status(400); throw new Error("Email already registered"); }
  const user = await User.create({ name, email, password, phone });
  res.status(201).json({
    success: true,
    token: generateToken(user._id),
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401); throw new Error("Invalid credentials");
  }
  res.json({
    success: true,
    token: generateToken(user._id),
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @GET /api/auth/me
exports.getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});
