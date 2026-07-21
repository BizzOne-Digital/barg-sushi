// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { sendContactMessage } = require("../utils/emailService");

router.post("/", asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    res.status(400); throw new Error("Name, email and message are required");
  }
  await sendContactMessage({ name, email, phone, message });
  res.json({ success: true, message: "Message sent" });
}));

module.exports = router;
