const express = require("express");
const {
  getUserRentals,
  getUserRental,
  addUserRental,
  updateRental,
} = require("../controllers/rentController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserRentals);
router.get("/:cid", protect, getUserRental);
router.post("/:cid", protect, addUserRental);
router.put("/:cid", protect, updateRental);

module.exports = router;
