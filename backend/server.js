const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// API ROUTES
// ===============================

// Authentication Routes
app.use("/api/auth", authRoutes);

// Contact / Booking Routes

app.use("/api/contact", (req, res, next) => {
  console.log("🚨 CONTACT API REQUEST RECEIVED");
  next();
}, contactRoutes);



console.log("✅ Contact routes loaded");



// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "Ankit Video Mixing Lab Backend is running!",
  });
});


// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is healthy",
  });
});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});