const { mongoose } = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "cng", "ev"],
      required: true,
    },
    category: {
      type: String,
      enum: ["hatchback", "suv", "sedan", "coupe", "jeep"],
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    isBooked: {
      type: Boolean,
      required: true,
      default: false,
    },
    registration: {
      type: String,
      required: true,
      unique: true,
    },
    image: {          
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
