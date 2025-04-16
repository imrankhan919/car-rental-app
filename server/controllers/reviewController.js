const expressAsyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const Car = require("../models/carModel");

const getCarReviews = expressAsyncHandler(async (req, res) => {
  const reviews = await Review.find({ car: req.params.cid }).populate("user", "name -_id");

  // Both of these methods are used to get the user details for each review
  // 1 . Returns User Ids in String so that u can map each Ids to get Review 
  // const usersId =  reviews.map((review) => {
  //   return review.user.toString();
  // }); 
  // 2. Uses MongoDB query and Returns Users with name and email
  //  const users = await User.find({ _id: { $in: usersId } }).select("name email");


  if (!reviews) {
    res.status(404);
    throw new Error("Reviews Not Found");
  }

  const formattedReviews = reviews.map((review) => ({
    _id: review._id,
    car: review.car,
    userName: review.user.name,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
  }));
  res.status(200).json(formattedReviews);
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

  // console.log(review)
  const reviewWithName = await Review.findById(review._id).populate("user", "name -_id");
  console.log(reviewWithName)

  if (!review) {
    res.status(400);
    throw new Error("Review Not Added");
  }

  res.status(201).json(reviewWithName);
});

module.exports = { getCarReviews, addCarReview };
