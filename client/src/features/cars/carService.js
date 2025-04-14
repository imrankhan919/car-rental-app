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
  const response = await axios.post("/api/admin/car", formData, options);
  return response.data;
};

const deleteCar = async (id, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("/api/admin/car/" + id, options);
  return response.data;
};

const updateCar = async (formData, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    "/api/admin/car/" + formData._id,
    formData,
    options
  );
  return response.data;
};

const carService = {
  fetchCars,
  createCar,
  deleteCar,
  updateCar,
};

export default carService;
