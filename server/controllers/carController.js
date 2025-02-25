const getCars = async (req, res) => {
  res.send("All Cars!!!");
};

const getCar = async (req, res) => {
  res.send("Single Car!!!");
};

module.exports = { getCars, getCar };
