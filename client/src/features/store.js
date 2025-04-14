import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import car from "./cars/carSlice";
import rentals from "./rentals/rentalSlice";

const store = configureStore({ reducer: { auth, car, rentals } });

export default store;
