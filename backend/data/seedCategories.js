// One-off: populate the Category collection from the current category list,
// and restore "Platters & Combos" on the 6 items that were wrongly moved out
// of it. Both operations are targeted updates — no MenuItem is deleted, and
// no field other than `category` is touched, so images are untouched.
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const Category = require("../models/Category");
const MenuItem = require("../models/MenuItem");

const categoryNames = [
  "Appetizers",
  "Salads",
  "Nigiri",
  "Sashimi",
  "Hand Rolls",
  "Our Classics",
  "Veggie Rolls",
  "Crispy Collection",
  "Light & Fresh",
  "Specialties",
  "Poke Bowls",
  "Tataki & Tartar",
  "Platters & Combos",
  "Grill",
  "Drinks",
];

const plattersComboItems = ["Vegetarian Platter", "Salmon Combo", "Tuna Combo", "Fried Combo", "Veggie Combo", "Le Pond"];

const run = async () => {
  await connectDB();

  await Category.deleteMany();
  await Category.insertMany(categoryNames.map((name, i) => ({ name, sortOrder: i })));
  console.log(`✅ Seeded ${categoryNames.length} categories`);

  const result = await MenuItem.updateMany(
    { name: { $in: plattersComboItems } },
    { $set: { category: "Platters & Combos" } }
  );
  console.log(`✅ Restored "Platters & Combos" on ${result.modifiedCount} items (no other fields touched)`);

  process.exit(0);
};

run().catch((err) => { console.error(err); process.exit(1); });
