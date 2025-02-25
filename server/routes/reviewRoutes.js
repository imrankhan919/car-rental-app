const express = require("express");
const {
  getCarReviews,
  addCarReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/", getCarReviews);
router.post("/add", addCarReview);

module.exports = router;
