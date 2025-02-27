const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = expressAsyncHandler(async (req, res) => {
  // Check all fields are coming in req.body
  const { name, phone, email, password } = req.body;

  if (!name || !phone || !email || !password) {
    res.status(400);
    throw new Error("Please fill all details!");
  }

  // Check if user exist
  const emailExist = await User.findOne({ email: email });
  const phoneExist = await User.findOne({ phone: phone });

  if (emailExist || phoneExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  // Hash Password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("User Not Created");
  }

  res.status(201).json(user);
});

const loginUser = expressAsyncHandler(async (req, res) => {
  // Check all fields are coming in req.body
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all details!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compareSync(password, user.password))) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

module.exports = { registerUser, loginUser };
