const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { upload, cloudinary } = require("../config/cloudinary");

// @POST /api/upload/image — Admin only
router.post("/image", protect, adminOnly, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  res.json({
    success: true,
    data: { url: req.file.path, publicId: req.file.filename },
  });
});

// @DELETE /api/upload/:publicId — Admin only
router.delete("/:publicId", protect, adminOnly, async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ success: true, message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
