const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const MenuItem = require("../models/MenuItem");

// @GET /api/categories — Public. Every defined category, with item counts.
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ sortOrder: 1, name: 1 });
  const counts = await MenuItem.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]);
  const countByName = Object.fromEntries(counts.map((c) => [c._id, c.count]));
  const data = categories.map((c) => ({
    _id: c._id,
    name: c.name,
    sortOrder: c.sortOrder,
    itemCount: countByName[c.name] || 0,
  }));
  res.json({ success: true, data });
});

// @POST /api/categories — Admin
exports.createCategory = asyncHandler(async (req, res) => {
  const name = (req.body.name || "").trim();
  if (!name) { res.status(400); throw new Error("Category name is required"); }

  const exists = await Category.findOne({ name });
  if (exists) { res.status(400); throw new Error("A category with this name already exists"); }

  const maxSort = await Category.findOne().sort({ sortOrder: -1 });
  const category = await Category.create({ name, sortOrder: (maxSort?.sortOrder ?? -1) + 1 });
  res.status(201).json({ success: true, data: category });
});

// @PUT /api/categories/:id — Admin. Renaming also updates every menu item using the old name.
exports.updateCategory = asyncHandler(async (req, res) => {
  const name = (req.body.name || "").trim();
  if (!name) { res.status(400); throw new Error("Category name is required"); }

  const category = await Category.findById(req.params.id);
  if (!category) { res.status(404); throw new Error("Category not found"); }

  const clash = await Category.findOne({ name, _id: { $ne: category._id } });
  if (clash) { res.status(400); throw new Error("A category with this name already exists"); }

  const oldName = category.name;
  category.name = name;
  await category.save();

  if (oldName !== name) {
    await MenuItem.updateMany({ category: oldName }, { $set: { category: name } });
  }

  res.json({ success: true, data: category });
});

// @DELETE /api/categories/:id — Admin. Refuses if items still reference it.
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) { res.status(404); throw new Error("Category not found"); }

  const itemCount = await MenuItem.countDocuments({ category: category.name });
  if (itemCount > 0) {
    res.status(400);
    throw new Error(`Cannot delete — ${itemCount} menu item(s) still use this category. Move or delete them first.`);
  }

  await category.deleteOne();
  res.json({ success: true, message: "Category deleted" });
});
