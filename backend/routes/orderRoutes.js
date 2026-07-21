const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder, getMyOrders, getAllOrders, updateOrderStatus, getOrderStats,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/my", protect, getMyOrders);
router.get("/stats", protect, adminOnly, getOrderStats);
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
module.exports = router;
