const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

gallerySchema.index({ sortOrder: 1 });

module.exports = mongoose.model("Gallery", gallerySchema);
