const getCarReviews = async (req, res) => {
  res.send("All Reviews Of Car!!!");
};

const addCarReview = async (req, res) => {
  res.send("Review Added For Car!!!");
};

module.exports = { getCarReviews, addCarReview };
