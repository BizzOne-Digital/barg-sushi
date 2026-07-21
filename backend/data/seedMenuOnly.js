const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const MenuItem = require("../models/MenuItem");
const { menuItems } = require("./menuSeed");

const seed = async () => {
  await connectDB();

  await MenuItem.deleteMany();
  await MenuItem.insertMany(menuItems);
  console.log(`✅ Reseeded ${menuItems.length} menu items (admin users and settings untouched)`);

  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
