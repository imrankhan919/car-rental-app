const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const Rental = require("../models/rentalModel");

function calculateDateDifference(startDateStr, endDateStr) {
  // Parse the date strings (format: DD/MM/YYYY)

  const [startDay, startMonth, startYear] = startDateStr.split("/").map(Number);
  const [endDay, endMonth, endYear] = endDateStr.split("/").map(Number);

  // Create Date objects
  // Note: JavaScript months are 0-indexed (0 = January, 11 = December)
  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay);

  // Calculate time difference in milliseconds
  const timeDiff = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}
const getUserRentals = expressAsyncHandler(async (req, res) => {
  const rentals = await Rental.find({ user: req.user._id });

  if (!rentals) {
    res.status(404);
    throw new Error("Rentals Not Found!");
  }

  res.status(200).json(rentals);
});

const getUserRental = expressAsyncHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.rid);

  if (!rental) {
    res.status(404);
    throw new Error("Rental Not Found!");
  }

  res.status(200).json(rental);
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
    res.status(400);
    throw new Error("Invalid Car Request");
  }

  let totalBill = calculateDateDifference(pickupDate, dropDate) * car.rate;

  // Check if car is available
  const car = await Car.findById(req.params.cid);

  if (car.isBooked) {
    res.status(400);
    throw new Error("Car is already booked!!");
  }

  const newRental = {
    user: req.user._id,
    car: req.params.cid,
    pickupDate,
    dropDate,
    totalBill,
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

  res.status(200).json({
    rental: addRental,
    car: updatedStatus,
  });
});

const updateRental = expressAsyncHandler(async (req, res) => {
  const { dropDate } = req.body;

  if (!dropDate) {
    res.status(400);
    throw new Error("Kindly Add Drop Date");
  }

  const rental = await Rental.findById(req.params.rid);
  const car = await Car.findById(rental.car);

  const newBill =
    calculateDateDifference(rental.pickupDate, dropDate) * car.rate;

  const updatedRental = await Rental.findByIdAndUpdate(req.params.rid, {
    dropDate: dropDate,
    totalBill: newBill,
  });

  if (!updatedRental) {
    res.status(400);
    throw new Error("Rental Not Updated");
  }

  res.status(200).json(updatedRental);
});

module.exports = { getUserRentals, addUserRental, getUserRental, updateRental };
