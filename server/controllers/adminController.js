const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");

const addCar = expressAsyncHandler(async (req, res) => {
  const { name, fuelType, category, rate, company } = req.body;

  if (!name || !fuelType || !category || !rate || !company) {
    res.status(400);
    throw new Error("Please Fill Details!!");
  }

  const car = await Car.create({ name, fuelType, category, rate, company });

  if (!car) {
    res.status(400);
    throw new Error("Car Not Created");
  }

  res.status(201).json(car);
});

const updateCar = async (req, res) => {
  res.send("Car Updated");
};

const removeCar = async (req, res) => {
  res.send("Car Removed");
};

const getRentals = async (req, res) => {
  res.send("All Rentals Here...");
};

const getAllUserReviews = async (req, res) => {
  res.send("All users reviews!!");
};

module.exports = {
  addCar,
  updateCar,
  removeCar,
  getRentals,
  getAllUserReviews,
};
