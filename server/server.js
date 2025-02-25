const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db_config");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// default route
app.get("/", (req, res) => {
  res.json({
    msg: "WELCOME TO CAR RENTAL API 1.0....",
  });
});

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Car Routes
app.use("/api/car", require("./routes/carRoutes"));

// Rental Routes
app.use("/api/rentals", require("./routes/rentalRoutes"));

// Admin Routes
app.use("/api/admin", require("./routes/adminRoutes"));

app.listen(PORT, () =>
  console.log(`Server is running at PORT : ${PORT}`.bgBlue)
);
