const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
// const uploadOnCloudinary = require("../config/cloudinary");

const registerUser = expressAsyncHandler(async (req, res) => {
  // Check all fields are coming in req.body
  try {
    const { name, phone, email, password, license } = req.body;

  if (!name || !phone || !email || !password) {
    res.status(400);
    throw new Error("Please fill all details!");
  }

  // if ([name, phone, password, email].some((field) => field?.trim() === "")) {
  //   res.status(400)
  //   throw new Error("Fields can't be empty");
    
  // }

  // Check if user exist
  const emailExist = await User.findOne({ email: email });
  const phoneExist = await User.findOne({ phone: phone });

  if (emailExist || phoneExist) {
    res.status(409);
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
    license : license || null
  });

  if (!user) {
    res.status(400);
    throw new Error("User Not Created");
  }

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
  } catch (error) {
    res.status(400).json({
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
  };
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
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const privateController = expressAsyncHandler(async (req, res) => {
  res.json(req.user);
});
// const uploadUser = expressAsyncHandler(async (req, res) => {
//   const localImage = req.file;

//   if (!localImage) {
//     res.status(400);
//     throw new Error("File Not Uploaded");
//   }

//   console.log("Uploaded File:", localImage);

//   // Upload to Cloudinary
//   const image = await uploadOnCloudinary(localImage.path);

//   // Save to MongoDB
//   const user = await User.create({
//     image: image.url,
//     name: "Test",
//     email: "test@example.com",
//     phone: "1234567890",
//     password: "hashedpassword",
//     isAdmin: false
//   });

//   res.status(201).json(user);
// });


const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, privateController };
