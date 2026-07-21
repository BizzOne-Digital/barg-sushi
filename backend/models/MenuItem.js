const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nameFr: { type: String, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Appetizers",
        "Salads",
        "Nigiri",
        "Sashimi",
        "Hand Rolls",
        "Our Classics",
        "Veggie Rolls",
        "Rolls",
        "Crispy Collection",
        "Light & Fresh",
        "Specialties",
        "Poke Bowls",
        "Tataki & Tartar",
        "Platters & Combos",
        "Drinks",
      ],
    },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    descriptionFr: { type: String, default: "" },
    pieces: { type: Number, default: null },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }], // e.g. "spicy", "vegetarian", "gluten-free"
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

menuItemSchema.index({ category: 1, available: 1 });
menuItemSchema.index({ featured: 1 });

module.exports = mongoose.model("MenuItem", menuItemSchema);
