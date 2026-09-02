const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));

app.get("/", (req, res) => res.json({ message: "Barg Sushi API running" }));

// Error handler
app.use((err, req, res, next) => {
  // Controllers set the intended status via res.status(xxx) before throwing —
  // that survives on res.statusCode even though express resets `err` to plain.
  // Fall back to 500 only when nothing more specific was set.
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : (err.statusCode || 500);
  res.status(status).json({ success: false, message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;

// Vercel imports this file as a serverless function (no listen needed there).
// Locally / on a normal host, run it as a regular server.
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
