const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const MenuItem = require("../models/MenuItem");
const User = require("../models/User");
const Settings = require("../models/Settings");
const { menuItems } = require("./menuSeed");

const seed = async () => {
  await connectDB();

  // Clear existing
  await MenuItem.deleteMany();
  await User.deleteMany({ role: "admin" });
  await Settings.deleteMany();

  // Seed menu
  await MenuItem.insertMany(menuItems);
  console.log(`✅ Seeded ${menuItems.length} menu items`);

  // Create admin
  await User.create({
    name: "Barg Admin",
    email: "admin@bargsushi.com",
    password: "Admin@2024!",
    role: "admin",
  });
  console.log("✅ Admin created: admin@bargsushi.com / Admin@2024!");

  // Default settings
  await Settings.create({
    restaurantName: "Barg Sushi Bar & Grill",
    tagline: "Serving High Quality Sushi, Grill & Bar",
    taxRate: 0.15,
    deliveryFee: 5,
    minimumOrder: 20,
    heroTitle: "Authentic Sushi Experience",
    heroSubtitle: "Dine-in · Takeout · Delivery · Party Orders",
    hours: {
      monday:    { open: "11:00", close: "22:00", closed: false },
      tuesday:   { open: "11:00", close: "22:00", closed: false },
      wednesday: { open: "11:00", close: "22:00", closed: false },
      thursday:  { open: "11:00", close: "22:00", closed: false },
      friday:    { open: "11:00", close: "23:00", closed: false },
      saturday:  { open: "11:00", close: "23:00", closed: false },
      sunday:    { open: "12:00", close: "21:00", closed: false },
    },
  });
  console.log("✅ Default settings created");

  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
