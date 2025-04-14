import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rentalService from "./rentalService";

const rentalSlice = createSlice({
  name: "rentals",
  initialState: {
    rentals: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default rentalSlice.reducer;

// GET RENTALS : (for admin)
export const getRentalsForAdmin = createAsyncThunk(
  "FETCH/ADMIN_RENTALS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return rentalService.fetchRentalsForAdmin(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
