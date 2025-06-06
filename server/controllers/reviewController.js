const expressAsyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");

const getCarReviews = expressAsyncHandler(async (req, res) => {
  const reviews = await Review.find({ car: req.params.cid });

  if (!reviews) {
    res.status(404);
    throw new Error("Reviews Not Found");
  }

  res.status(200).json(reviews);
});

const addCarReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    res.status(400);
    throw new Error("Please Fill All Details!!");
  }

  const review = await Review.create({
    car: req.params.cid,
    user: req.user._id,
    rating,
    comment,
  });

  if (!review) {
    res.status(400);
    throw new Error("Review Not Added");
  }

  res.status(201).json(review);
});

module.exports = { getCarReviews, addCarReview };
