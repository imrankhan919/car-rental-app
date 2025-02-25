const express = require("express");
const {
  addCar,
  updateCar,
  removeCar,
  getRentals,
  getAllUserReviews,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/rentals", getRentals);
router.get("/reviews", getAllUserReviews);
router.post("/car", addCar);
router.put("/car/:id", updateCar);
router.delete("/car/:id", removeCar);

module.exports = router;
