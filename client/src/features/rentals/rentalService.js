import axios from "axios";

const fetchRentalsForAdmin = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/admin/rentals", options);
  console.log(response.data);
  return response.data;
};

const rentalService = { fetchRentalsForAdmin };

export default rentalService;
