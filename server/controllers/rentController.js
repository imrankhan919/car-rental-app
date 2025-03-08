const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const Rental = require("../models/rentalModel");
const { calculateDaysBetweenDates } = require("../helpers/dateHelper");

const getUserRentals = async (req, res) => {
  const rentals = await Rental.find();

  if (!rentals) {
    res.status(404);
    res.json({ msg: "No Rentals Found!!!" });
  }

  res.status(200).json(rentals);
};

const getUserRental = async (req, res) => {
  const rental = await Rental.findById(req.params.cid);
  if (!rental) {
    res.status(404);
    res.json({ msg: "No Rental Found!!!" });
  }
  res.status(200).json(rental);
};

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

  // Calculate total bill
  let days;
  try {
    days = calculateDaysBetweenDates(pickupDate, dropDate);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid date format");
  }

  if (isNaN(days) || days < 0) {
    res.status(400);
    throw new Error("Invalid date range");
  }

  const totalBill = Number(days * carExist.rate);

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
    totalDays: days
  });
});

const updateRental = async (req, res) => {
  res.send("Rental Updated!!");
};

module.exports = { getUserRentals, addUserRental, getUserRental, updateRental };
