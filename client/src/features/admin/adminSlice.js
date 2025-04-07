import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carService from "../car/carService";
import { adminService } from "./adminService";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    cars: [],
    allRentals : [],
    allReviews : [],
    isAdminLoading: false,
    isAdminSuccess: false,
    isAdminError: false,
    adminErrorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
     
      builder
        .addCase(adminAllCars.pending, (state, action) => {
          state.isAdminLoading = true;
          state.isAdminSuccess = false;
          state.isAdminError = false;
        })
        .addCase(adminAllCars.fulfilled, (state, action) => {
          state.isAdminLoading = false;
          state.isAdminSuccess = true;
          state.cars = action.payload.cars;
          state.isAdminError = false;
        })
        .addCase(adminAllCars.rejected, (state, action) => {
          state.isAdminLoading = false;
          state.isAdminSuccess = false;
          state.isAdminError = true;
          state.adminErrorMessage = action.payload;
        })
        .addCase(getAllRentalsAdmin.pending, (state, action) => {
          state.isAdminLoading = true;
          state.isAdminSuccess = false;
          state.isAdminError = false;
        })
        .addCase(getAllRentalsAdmin.fulfilled, (state, action) => {
          state.isAdminLoading = false;
          state.isAdminSuccess = true;
          state.allRentals = action.payload;
          state.isAdminError = false;
        })
        .addCase(getAllRentalsAdmin.rejected, (state, action) => {
          state.isAdminLoading = false;
          state.isAdminSuccess = false;
          state.isAdminError = true;
          state.adminErrorMessage = action.payload;
        })
        .addCase(getAllReviewsAdmin.pending, (state, action) => {
          state.isAdminLoading = true;
          state.isAdminSuccess = false;
          state.isAdminError = false;
        })
        .addCase(getAllReviewsAdmin.fulfilled, (state, action) => {
          state.isAdminLoading = false;
          state.isAdminSuccess = true;
          state.allReviews = action.payload;
          state.isAdminError = false;
        })
        .addCase(getAllReviewsAdmin.rejected, (state, action) => {
          state.isAdminLoading = false;
          state.isAdminSuccess = false;
          state.isAdminError = true;
          state.adminErrorMessage = action.payload;
        })
    }
  }
);

export default adminSlice.reducer;

export const adminAllCars = createAsyncThunk(
  "CAR/GET_ALL", 
  async (_, thunkAPI) => {
    try {
        return await carService.fetchCars();
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
        
    }
  }
)

export const addCar = createAsyncThunk(
  "CAR/ADD",
  async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.createCar(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateExistingCar = createAsyncThunk(
  "CAR/UPDATE",
  async (carId,formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.updateCar(carId, formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeCar = createAsyncThunk(
  "CAR/DELETE",
  async (id, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.deleteCar(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllRentalsAdmin = createAsyncThunk(
  "RENTAL/GET_ALL",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.getAllRentals(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllReviewsAdmin = createAsyncThunk(
  "REVIEW/GET_ALL",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.getAllReviews(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);