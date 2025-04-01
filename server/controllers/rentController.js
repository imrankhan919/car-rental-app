const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const Rental = require("../models/rentalModel");
const calculateDaysBetweenDates = require("../helpers/dateHelper");

const getUserRentals = expressAsyncHandler(async (req, res) => {
  // Find rentals for the current user only
  const rentals = await Rental.find({ user: req.user._id }).populate('car');

  if (!rentals || rentals.length === 0) {
    res.status(404);
    throw new Error(`No Rentals Found for ${req.user.name}`);
  }

  res.status(200).json(rentals);
});

const getUserRental = expressAsyncHandler(async (req, res) => {
  // Find rental by car ID
  const rental = await Rental.findOne({ car: req.params.cid });

  if (!rental) {
    res.status(404);
    throw new Error("No Rental Found!!!");
  }

  // Get car details
  const car = await Car.findById(req.params.cid);

  if (!car) {
    res.status(404);
    throw new Error("Car Not Found!!!");
  }

  // Return both rental and car details
  res.status(200).json({
    rental,
    car
  });
});

const addUserRental = expressAsyncHandler(async (req, res) => {
  const { pickupDate, dropDate } = req.body;

  if (!pickupDate || !dropDate) {
    res.status(400);
    throw new Error("Please Fill Pickup & Drop Date");
  }

  // Check if params car exist
  const carExist = await Car.findById(req.params.cid);

  if (!carExist) {
    res.status(404);
    throw new Error("Car not found");
  }

  // if (carExist.isBooked) {
  //   res.status(400);
  //   throw new Error("Car is currently booked");
  // }

  // Check if the car is already rented for the given date range
  const existingRental = await Rental.findOne({
    car: req.params.cid,
    $or: [
      {
        $and: [
          { pickupDate: { $lte: dropDate } },
          { dropDate: { $gte: pickupDate } }
        ]
      }
    ]
  });
  if (existingRental) {
    res.status(409); // Conflict status code
    throw new Error(`Car is already booked from ${existingRental.pickupDate} to ${existingRental.dropDate}`);
  }

  // Calculate total bill
  let days;
  try {
    days = calculateDaysBetweenDates(pickupDate, dropDate);

    // Ensure minimum 1 day rental
    days = Math.max(1, Math.ceil(days));

    if (days <= 0) {
      throw new Error("Invalid date range");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "Invalid date format");
  }

  const totalBill = days * carExist.rate;

  // Validate total bill
  if (isNaN(totalBill) || totalBill <= 0) {
    res.status(400);
    throw new Error("Invalid total bill calculation");
  }

  const newRental = {
    pickupDate,
    dropDate,
    totalBill,
    car: req.params.cid,
    user: req.user._id
  };

  // Create Rental
  const addRental = await Rental.create(newRental);
  // Update Car Status
  const updatedStatus = await Car.findByIdAndUpdate(
    req.params.cid,
    { isBooked: true },
    { new: true }
  );

  if (!addRental || !updatedStatus) {
    res.status(400);
    throw new Error("Car Not Booked");
  }

  // Simplify and structure the response
  res.status(201).json({
    success: true,
    bookingDetails: {
      rentalId: addRental._id,
      carName: updatedStatus.name,
      pickupDate: addRental.pickupDate,
      dropDate: addRental.dropDate,
      totalDays: days,
      totalAmount: addRental.totalBill
    }
  });
});

const updateRental = expressAsyncHandler(async (req, res) => {
  // First find the rental by car ID
  const rental = await Rental.findOne({ car: req.params.cid });

  if (!rental) {
    res.status(404);
    throw new Error("Rental not found");
  }

  // Check if user owns this rental
  if (rental.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this rental");
  }

  // Update the rental using the rental's _id
  const updatedRental = await Rental.findByIdAndUpdate(
    rental._id, // Use the rental's _id instead of params.id
    req.body,
    { new: true }
  ).populate('car');

  if (!updatedRental) {
    res.status(400);
    throw new Error("Rental can't be updated");
  }

  res.status(200).json({
    success: true,
    rental: updatedRental
  });
});

module.exports = { getUserRentals, addUserRental, getUserRental, updateRental };
