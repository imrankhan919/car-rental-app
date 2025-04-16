const express = require("express");
const {
  registerUser,
  loginUser,
  privateController,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
// const upload = require("../middleware/multerMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/upload",upload.single("image"), uploadUser);
router.post("/private", protect, privateController);

module.exports = router;
