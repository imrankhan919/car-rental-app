import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import car from "./cars/carSlice";

const store = configureStore({ reducer: { auth, car } });

export default store;
