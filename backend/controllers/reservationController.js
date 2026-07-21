const asyncHandler = require("express-async-handler");
const Reservation = require("../models/Reservation");
const { sendReservationConfirmation } = require("../utils/emailService");

// @POST /api/reservations — Public
exports.createReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.create(req.body);
  await sendReservationConfirmation(reservation);
  res.status(201).json({ success: true, data: reservation });
});

// @GET /api/reservations — Admin
exports.getAllReservations = asyncHandler(async (req, res) => {
  const { status, date } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    filter.date = { $gte: start, $lt: end };
  }
  const reservations = await Reservation.find(filter).sort({ date: 1, time: 1 });
  res.json({ success: true, count: reservations.length, data: reservations });
});

// @PUT /api/reservations/:id/status — Admin
exports.updateReservationStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    { status, notes },
    { new: true }
  );
  if (!reservation) { res.status(404); throw new Error("Reservation not found"); }
  res.json({ success: true, data: reservation });
});
