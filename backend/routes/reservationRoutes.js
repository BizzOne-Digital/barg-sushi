const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createReservation, getAllReservations, updateReservationStatus,
} = require("../controllers/reservationController");

router.post("/", createReservation);
router.get("/", protect, adminOnly, getAllReservations);
router.put("/:id/status", protect, adminOnly, updateReservationStatus);
module.exports = router;
