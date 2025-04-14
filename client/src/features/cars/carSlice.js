import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carService from "./carService";

const carSlice = createSlice({
  name: "car",
  initialState: {
    cars: [],
    car: {},
    edit: { car: {}, isEdit: false },
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    editCar: (state, action) => {
      return {
        ...state,
        edit: { car: action.payload, isEdit: true },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload;
        state.isError = false;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCar.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = [action.payload, ...state.cars];
        state.isError = false;
      })
      .addCase(addCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeCar.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = state.cars.filter(
          (item) => item._id !== action.payload.id
        );
        state.isError = false;
      })
      .addCase(removeCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCarDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateCarDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = state.cars.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.edit = { car: {}, isEdit: false };
        state.isError = false;
      })
      .addCase(updateCarDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { editCar } = carSlice.actions;
export default carSlice.reducer;

// Get Cars
export const getCars = createAsyncThunk("FETCH/CARS", async (_, thunkAPI) => {
  try {
    return await carService.fetchCars();
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Add Car : (Admin Only)

export const addCar = createAsyncThunk(
  "CAR/ADD",
  async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await carService.createCar(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove Car : (Admin Only)
export const removeCar = createAsyncThunk(
  "CAR/REMOVE",
  async (id, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await carService.deleteCar(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Updare Car : (Admin Only)
export const updateCarDetails = createAsyncThunk(
  "CAR/UPDATE",
  async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await carService.updateCar(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
