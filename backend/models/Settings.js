const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, default: "Barg Sushi Bar & Grill" },
    tagline: { type: String, default: "Serving High Quality Sushi, Grill & Bar" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    hours: {
      monday: { open: String, close: String, closed: Boolean },
      tuesday: { open: String, close: String, closed: Boolean },
      wednesday: { open: String, close: String, closed: Boolean },
      thursday: { open: String, close: String, closed: Boolean },
      friday: { open: String, close: String, closed: Boolean },
      saturday: { open: String, close: String, closed: Boolean },
      sunday: { open: String, close: String, closed: Boolean },
    },
    deliveryFee: { type: Number, default: 5 },
    minimumOrder: { type: Number, default: 20 },
    taxRate: { type: Number, default: 0.15 }, // 15% Quebec
    deliveryEnabled: { type: Boolean, default: true },
    takeoutEnabled: { type: Boolean, default: true },
    dineInEnabled: { type: Boolean, default: true },
    reservationsEnabled: { type: Boolean, default: true },
    heroTitle: { type: String, default: "Authentic Sushi Experience" },
    heroSubtitle: { type: String, default: "Dine-in · Takeout · Delivery · Party Orders" },
    heroImage: { type: String, default: "" },
    specialOffer: { type: String, default: "" },
    specialOfferEnabled: { type: Boolean, default: false },
    socialFacebook: { type: String, default: "" },
    socialInstagram: { type: String, default: "" },
    socialTiktok: { type: String, default: "" },
    googleMapsEmbed: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
