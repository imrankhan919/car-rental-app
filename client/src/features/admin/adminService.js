import axios from "axios";

const createCar = async (formData, token) => {
    const response = await axios.post(`/api/admin/car`, formData, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

const updateCar = async ( formData, token) => {
    const response = await axios.put(`/api/admin/car/${formData.id}`, formData, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

const deleteCar = async (carId, token) => {
    const response = await axios.delete(`/api/admin/car/${carId}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

const getAllRentals = async (token) => {
    const response = await axios.get('/api/admin/rentals', {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

const getAllReviews = async (token) => {
    const response = await axios.get('/api/admin/reviews', {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const adminService = {
    createCar,
    updateCar,
    deleteCar,
    getAllRentals,
    getAllReviews
}