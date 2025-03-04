const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");

const addCar = expressAsyncHandler(async (req, res) => {
  const { name, fuelType, category, rate, company, registration } = req.body;

  if (!name || !fuelType || !category || !rate || !company || !registration) {
    res.status(400);
    throw new Error("Please Fill Details!!");
  }

  const car = await Car.create({
    name,
    fuelType,
    category,
    rate,
    company,
    registration,
  });

  if (!car) {
    res.status(400);
    throw new Error("Car Not Created");
  }

  res.status(201).json(car);
});

const updateCar = async (req, res) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedCar) {
    res.status(400);
    throw new Error("Car can't be updated");
  }

  res.status(200).json(updatedCar);
};

const removeCar = expressAsyncHandler(async (req, res) => {
  const removedCar = await Car.findByIdAndDelete(req.params.id);
  res.status(200).json({
    id: req.params.id,
    message: "Car Removed",
  });
});

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
