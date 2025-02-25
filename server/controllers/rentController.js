const getUserRentals = async (req, res) => {
  res.send("All Users Rentals!!");
};

const getUserRental = async (req, res) => {
  res.send("Single Rental!!");
};

const addUserRental = async (req, res) => {
  res.send("Rental Added!!");
};

const updateRental = async (req, res) => {
  res.send("Rental Updated!!");
};

module.exports = { getUserRentals, addUserRental, getUserRental, updateRental };
