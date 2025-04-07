import axios from "axios";

const fetchRentals = async (token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/rentals", options);
  return response.data;
};

const fetchRental = async (cid, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/rentals/" + cid, options);
  return response.data;
};

const createRental = async (formData, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    "/api/rentals/" + formData.id,
    formData,
    options
  );
  return response.data;
};

const rentalService = { fetchRentals, createRental, fetchRental };

export default rentalService;
