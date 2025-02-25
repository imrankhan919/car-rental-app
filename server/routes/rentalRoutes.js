const express = require("express");
const {
  getUserRentals,
  getUserRental,
  addUserRental,
  updateRental,
} = require("../controllers/rentController");

const router = express.Router();

router.get("/", getUserRentals);
router.get("/:cid", getUserRental);
router.post("/:cid", addUserRental);
router.put("/:cid", updateRental);

module.exports = router;
