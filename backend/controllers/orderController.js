const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Settings = require("../models/Settings");
const { sendOrderConfirmation } = require("../utils/emailService");

// @POST /api/orders — Public (guest or logged in)
exports.createOrder = asyncHandler(async (req, res) => {
  if (req.body.scheduledFor) {
    const scheduled = new Date(req.body.scheduledFor);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    if (Number.isNaN(scheduled.getTime()) || scheduled < new Date() || scheduled > maxDate) {
      res.status(400);
      throw new Error("Scheduled date must be between now and 7 days from today");
    }
  }

  const settings = await Settings.findOne();
  const taxRate = settings?.taxRate || 0.15;
  const deliveryFee = req.body.orderType === "delivery" ? (settings?.deliveryFee || 5) : 0;

  const subtotal = req.body.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = parseFloat((subtotal * taxRate).toFixed(2));
  const total = parseFloat((subtotal + tax + deliveryFee + (req.body.tip || 0)).toFixed(2));

  const orderData = {
    ...req.body,
    subtotal,
    tax,
    deliveryFee,
    total,
  };

  if (req.user) orderData.customer = req.user._id;

  const order = await Order.create(orderData);

  // Send confirmation email
  const email = req.user?.email || req.body.guestEmail;
  const name = req.user?.name || req.body.guestName;
  if (email) await sendOrderConfirmation({ email, name, order });

  res.status(201).json({ success: true, data: order });
});

// @GET /api/orders/my — Customer: own orders
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
});

// @GET /api/orders — Admin: all orders
exports.getAllOrders = asyncHandler(async (req, res) => {
  const { status, date, orderType } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (orderType) filter.orderType = orderType;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    filter.createdAt = { $gte: start, $lt: end };
  }
  const orders = await Order.find(filter)
    .populate("customer", "name email phone")
    .sort({ createdAt: -1 });
  res.json({ success: true, count: orders.length, data: orders });
});

// @PUT /api/orders/:id/status — Admin
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) { res.status(404); throw new Error("Order not found"); }
  res.json({ success: true, data: order });
});

// @GET /api/orders/stats — Admin dashboard stats
exports.getOrderStats = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todayOrders, totalOrders, pendingOrders, revenue] = await Promise.all([
    Order.countDocuments({ createdAt: { $gte: today } }),
    Order.countDocuments(),
    Order.countDocuments({ status: { $in: ["pending", "confirmed", "preparing"] } }),
    Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
  ]);

  res.json({
    success: true,
    data: {
      todayOrders,
      totalOrders,
      pendingOrders,
      totalRevenue: revenue[0]?.total || 0,
    },
  });
});
