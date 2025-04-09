import axios from "axios";

const fetchCars = async () => {
  const response = await axios.get("/api/car");
  return response.data;
};

const createCar = async (formData, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  console.log(options);

  const response = await axios.post("/api/admin/car", formData, options);
  console.log(response.data);
  return response.data;
};

const carService = {
  fetchCars,
  createCar,
};

export default carService;
