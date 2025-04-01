const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const Rental = require("../models/rentalModel");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");

const addCar = expressAsyncHandler(async (req, res) => {
  const {
    name,
    fuelType,
    category,
    rate,
    company,
    registration,
    image,
    description,
    mileage,
    seats,
    transmission,
  } = req.body;

  if (
    !name ||
    !fuelType ||
    !category ||
    !rate ||
    !company ||
    !registration ||
    !mileage ||
    !seats ||
    !transmission
  ) {
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
    image,
    description,
    mileage,
    seats,
    transmission,
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
  // Get all rentals with populated car and user fields
  const rentals = await Rental.find()
    .populate("car")
    .populate("user", "-password -isAdmin");

  if (!rentals || rentals.length === 0) {
    res.status(404);
    throw new Error("No Rentals Found");
  }

  // Get all users
  const users = await User.find({}, "-password -isAdmin");

  // Create a mapping of users to their rentals
  const usersWithRentals = users.map(user => {
    // Filter rentals for the current user
    const userRentals = rentals.filter(
      rental => rental.user._id.toString() === user._id.toString()
    );

    // Return user object with their rentals
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      license: user.license,
      createdAt: user.createdAt,
      rentals: userRentals.map(rental => ({
        _id: rental._id,
        car: rental.car,
        pickupDate: rental.pickupDate,
        dropDate: rental.dropDate,
        totalBill: rental.totalBill,
        status: rental.car.isBooked ? "Booked" : "Available",
        createdAt: rental.createdAt
      }))
    };
  });

  res.status(200).json({
    users: usersWithRentals,
    totalUsers: usersWithRentals.length,
    totalRentals: rentals.length
  });
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
