const addCar = async (req, res) => {
  res.send("Car Added");
};

const updateCar = async (req, res) => {
  res.send("Car Updated");
};

const removeCar = async (req, res) => {
  res.send("Car Removed");
};

const getRentals = async (req, res) => {
  res.send("All Rentals Here...");
};

const getAllUserReviews = async (req, res) => {
  res.send("All users reviews!!");
};

module.exports = {
  addCar,
  updateCar,
  removeCar,
  getRentals,
  getAllUserReviews,
};
