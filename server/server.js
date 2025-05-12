const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db_config");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Car Routes
app.use("/api/car", require("./routes/carRoutes"));

// Rental Routes
app.use("/api/rentals", require("./routes/rentalRoutes"));

// Admin Routes
app.use("/api/admin", require("./routes/adminRoutes"));


if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.get("/", (req, res) => {
    res.send("Car Rental API is running....");
  });
}






// Error Handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running at PORT : ${PORT}`.bgBlue)
);
