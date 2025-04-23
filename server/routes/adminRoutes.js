const express = require("express");
const {
  addCar,
  updateCar,
  removeCar,
  getAllRentals,
  getAllUserReviews,
} = require("../controllers/adminController");
const adminProtect = require("../middleware/adminMiddleware");
const upload = require("../middleware/multerMiddleware")

const router = express.Router();

router.get("/rentals",adminProtect, getAllRentals);
router.get("/reviews",adminProtect, getAllUserReviews);
router.post("/car", adminProtect, upload.single("image"), addCar);
router.put("/car/:id", adminProtect, upload.single("image"),updateCar);
router.delete("/car/:id", adminProtect, removeCar);

module.exports = router;
