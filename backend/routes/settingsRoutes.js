const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Settings = require("../models/Settings");

// @GET /api/settings — Public
router.get("/", asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  res.json({ success: true, data: settings });
}));

// @PUT /api/settings — Admin
router.put("/", protect, adminOnly, asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(req.body);
  } else {
    settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  }
  res.json({ success: true, data: settings });
}));

module.exports = router;
