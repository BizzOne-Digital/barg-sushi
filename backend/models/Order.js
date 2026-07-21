const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  specialInstructions: { type: String, default: "" },
});

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Guest ordering (no account)
    guestName: { type: String },
    guestEmail: { type: String },
    guestPhone: { type: String },

    items: [orderItemSchema],

    orderType: {
      type: String,
      enum: ["dine-in", "takeout", "delivery"],
      required: true,
    },

    deliveryAddress: {
      street: String,
      city: String,
      province: String,
      postalCode: String,
      notes: String,
    },

    tableNumber: { type: String },

    // Advance ordering — customer can schedule pickup/delivery up to 7 days ahead
    scheduledFor: {
      type: Date,
      validate: {
        validator: function (value) {
          if (!value) return true;
          const now = new Date();
          const maxDate = new Date();
          maxDate.setDate(maxDate.getDate() + 7);
          return value >= now && value <= maxDate;
        },
        message: "Scheduled date must be between now and 7 days from today",
      },
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "ready", "out-for-delivery", "delivered", "cancelled"],
      default: "pending",
    },

    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    tip: { type: Number, default: 0 },
    total: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["card", "cash", "online"],
      default: "cash",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    stripePaymentId: { type: String },

    estimatedTime: { type: Number }, // minutes
    notes: { type: String, default: "" },
    orderNumber: { type: String, unique: true },
  },
  { timestamps: true }
);

// Auto-generate order number before save
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `BARG-${String(count + 1).padStart(5, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
