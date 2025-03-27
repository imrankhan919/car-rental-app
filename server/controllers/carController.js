const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");

const getCars = expressAsyncHandler(async (req, res) => {
  const cars = await Car.find();

  if (!cars) {
    res.status(404);
    throw new Error("Cars Not Found");
  }

  res.status(200).json(cars);
});

const getCar = expressAsyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    res.status(404);
    throw new Error("Car Not Found");
  }

  res.status(200).json(car);
});

const searchCar = expressAsyncHandler(async (req, res) => {
  const { query } = req.query;

  const results = await Car.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { company: { $regex: query, $options: "i" } },
    ],
  });

  if (!results) {
    res.status(404);
    throw new Error("No Cars Here");
  }
  res.status(200);
  res.json(results);
});

module.exports = { getCars, getCar, searchCar };
