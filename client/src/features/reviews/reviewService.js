import axios from "axios";

const addReview = async ({rating, comment, id, token}) => {
    const response = await axios.post(`/api/car/${id}/reviews/add`, {rating, comment}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log("responseFromService",response)
    return response.data;
};

const getReviews = async (id, token) => {
    const response = await axios.get(`/api/car/${id}/reviews`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export { addReview, getReviews };

