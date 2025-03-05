const expressAsyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const Rental = require("../models/rentalModel");

const getUserRentals = async (req, res) => {
  res.send("All Users Rentals!!");
};

const getUserRental = async (req, res) => {
  res.send("Single Rental!!");
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

  //  Fix This
  let totalBill =
    (dropDate.split("-")[0] - pickupDate.split("-")[0]) * carExist.rate;

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

const updateRental = async (req, res) => {
  res.send("Rental Updated!!");
};

module.exports = { getUserRentals, addUserRental, getUserRental, updateRental };
