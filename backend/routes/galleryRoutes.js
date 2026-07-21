const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getGalleryImages, createGalleryImage, deleteGalleryImage } = require("../controllers/galleryController");

router.get("/", getGalleryImages);
router.post("/", protect, adminOnly, createGalleryImage);
router.delete("/:id", protect, adminOnly, deleteGalleryImage);

module.exports = router;
