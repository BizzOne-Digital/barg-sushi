const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getMenuItems, getCategories, getMenuItem,
  createMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability,
} = require("../controllers/menuController");

router.get("/", getMenuItems);
router.get("/categories", getCategories);
router.get("/:id", getMenuItem);
router.post("/", protect, adminOnly, createMenuItem);
router.put("/:id", protect, adminOnly, updateMenuItem);
router.delete("/:id", protect, adminOnly, deleteMenuItem);
router.patch("/:id/toggle", protect, adminOnly, toggleAvailability);
module.exports = router;
