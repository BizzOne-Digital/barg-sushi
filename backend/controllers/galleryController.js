const asyncHandler = require("express-async-handler");
const Gallery = require("../models/Gallery");
const { cloudinary } = require("../config/cloudinary");

// @GET /api/gallery — Public
exports.getGalleryImages = asyncHandler(async (req, res) => {
  const images = await Gallery.find().sort({ sortOrder: 1, createdAt: -1 });
  res.json({ success: true, count: images.length, data: images });
});

// @POST /api/gallery — Admin
exports.createGalleryImage = asyncHandler(async (req, res) => {
  const image = await Gallery.create(req.body);
  res.status(201).json({ success: true, data: image });
});

// @DELETE /api/gallery/:id — Admin
exports.deleteGalleryImage = asyncHandler(async (req, res) => {
  const image = await Gallery.findByIdAndDelete(req.params.id);
  if (!image) { res.status(404); throw new Error("Image not found"); }
  if (image.image?.publicId) {
    await cloudinary.uploader.destroy(image.image.publicId).catch(() => {});
  }
  res.json({ success: true, message: "Image deleted" });
});
