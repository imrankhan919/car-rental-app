const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const Rental = require("../models/rentalModel");
const Review = require("../models/reviewModel");

const addCar = expressAsyncHandler(async (req, res) => {
  const { name, fuelType, category, rate, company, registeration, image, description,
    mileage, seats, transmission
  } =
    req.body;

  if (!name || !fuelType || !category || !rate || !company || !registeration || !mileage || !seats || !transmission) {
    res.status(400);
    throw new Error("Please Fill Details!!");
  }

  const car = await Car.create({
    name,
    fuelType,
    category,
    rate,
    company,
    registeration,
    image,
    description,
    mileage,
    seats,
    transmission
  });

  if (!car) {
    res.status(400);
    throw new Error("Car Not Created");
  }

  res.status(201).json(car);
});

const updateCar = expressAsyncHandler(async (req, res) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedCar) {
    res.status(400);
    throw new Error("Car can't be updated");
  }

  res.status(200).json(updatedCar);
});

const removeCar = expressAsyncHandler(async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.status(200).json({
    id: req.params.id,
    message: "Car Removed",
  });
});


const getAllRentals = expressAsyncHandler(async (req, res) => {
  const rentals = await Rental.find()
    .populate('car')
    .populate({
      path: 'user',
      select: 'name email phone city -password'  // Specify the user fields you want
    });

  if (!rentals || rentals.length === 0) {
    res.status(404);
    throw new Error("No Rentals Found");
  }

  res.status(200).json(rentals);

});

const getAllUserReviews = expressAsyncHandler(async (req, res) => {
  const reviews = await Review.find();

  if (!reviews || reviews.length === 0) {
    res.status(404);
    throw new Error("Reviews Not Found");
  }

  res.status(200).json(reviews);
});

module.exports = {
  addCar,
  updateCar,
  removeCar,
  getAllRentals,
  getAllUserReviews,
};
