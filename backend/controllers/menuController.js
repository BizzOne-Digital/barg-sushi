const asyncHandler = require("express-async-handler");
const MenuItem = require("../models/MenuItem");

// @GET /api/menu — Public
exports.getMenuItems = asyncHandler(async (req, res) => {
  const { category, menuType, featured, available } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (menuType) filter.menuType = menuType;
  if (featured === "true") filter.featured = true;
  if (available !== "false") filter.available = true;

  const items = await MenuItem.find(filter).sort({ category: 1, sortOrder: 1, name: 1 });
  res.json({ success: true, count: items.length, data: items });
});

// @GET /api/menu/categories — Public
exports.getCategories = asyncHandler(async (req, res) => {
  const cats = await MenuItem.distinct("category", { available: true });
  res.json({ success: true, data: cats });
});

// @GET /api/menu/types — Public
exports.getMenuTypes = asyncHandler(async (req, res) => {
  const types = await MenuItem.distinct("menuType", { available: true });
  res.json({ success: true, data: types });
});

// @GET /api/menu/:id — Public
exports.getMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) { res.status(404); throw new Error("Item not found"); }
  res.json({ success: true, data: item });
});

// @POST /api/menu — Admin
exports.createMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json({ success: true, data: item });
});

// @PUT /api/menu/:id — Admin
exports.updateMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) { res.status(404); throw new Error("Item not found"); }
  res.json({ success: true, data: item });
});

// @DELETE /api/menu/:id — Admin
exports.deleteMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) { res.status(404); throw new Error("Item not found"); }
  res.json({ success: true, message: "Item deleted" });
});

// @PATCH /api/menu/:id/toggle — Admin (toggle availability)
exports.toggleAvailability = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) { res.status(404); throw new Error("Item not found"); }
  item.available = !item.available;
  await item.save();
  res.json({ success: true, data: item });
});
