const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // e.g. "7:00 PM"
    partySize: { type: Number, required: true, min: 1 },
    specialRequests: { type: String, default: "" },
    occasion: { type: String, default: "" }, // Birthday, Anniversary, etc.
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    confirmationCode: { type: String, unique: true },
    notes: { type: String, default: "" }, // Admin internal notes
  },
  { timestamps: true }
);

reservationSchema.pre("save", function (next) {
  if (!this.confirmationCode) {
    this.confirmationCode = "RES-" + Math.random().toString(36).substr(2, 8).toUpperCase();
  }
  next();
});

module.exports = mongoose.model("Reservation", reservationSchema);
