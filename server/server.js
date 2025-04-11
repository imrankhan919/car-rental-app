const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db_config");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});




const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Error Handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running at PORT : ${PORT}`.bgBlue)
);
