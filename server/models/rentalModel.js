const { mongoose } = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.types.ObjectId,
      ref: "Car",
      required: true,
    },
    user: {
      type: mongoose.Schema.types.ObjectId,
      ref: "User",
      required: true,
    },
    pickupDate: {
      type: String,
      required: true,
    },
    dropDate: {
      type: String,
      required: true,
    },
    totalBill: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rental", rentalSchema);
