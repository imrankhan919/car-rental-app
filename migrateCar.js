const mongoose = require("mongoose");
const Car = require("./server/models/carModel"); // adjust path if needed
const uploadOnCloudinary = require("./server/config/cloudinary"); // your upload function
const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected to DB");

  const cars = await Car.find({}); // fetch all cars

  // Loop through each car
  for (let car of cars) {
    // Check if the image is a non-Cloudinary URL
    if (car.image && typeof car.image === "string" && car.image.startsWith("http") && !car.image.includes("cloudinary")) {
      try {
        console.log(`Processing: ${car.name} - ${car.image}`);

        // Backup the old image URL (for future reference or re-upload)
        const oldImageBackup = car.image;

        // Download the image temporarily
        const response = await axios.get(car.image, { responseType: "arraybuffer" });
        const fileName = `temp-${Date.now()}.jpg`;
        const localPath = path.join(__dirname, "public", "temp", fileName);

        fs.writeFileSync(localPath, response.data); // Save the image to disk

        // Upload to Cloudinary
        const uploadResult = await uploadOnCloudinary(localPath);

        // Update the car record with new Cloudinary URL and public_id
        car.image = {
          url: uploadResult.secure_url, // Cloudinary URL
          public_id: uploadResult.public_id, // Cloudinary public_id (for future deletion)
          backup_url: oldImageBackup, // Store the original URL as backup
        };

        // Save the updated car
        await car.save();

        console.log(`Updated ${car.name} with Cloudinary URL`);

        // Clean up the temporary file
        fs.unlinkSync(localPath);

      } catch (err) {
        console.error(`Error with ${car.name}:`, err.message);
      }
    } else {
      console.log(`Skipped ${car.name} - Already has Cloudinary image`);
    }
  }

  console.log("Migration done");
  process.exit();
});
