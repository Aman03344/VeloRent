import { configureStore } from "@reduxjs/toolkit";
import auth from "./AUTH/authSlice";
import car from "./CAR/carSlice";
import rentals from "./rentals/rentalSlice";
import review from "./Review/reviewSlice";

const store = configureStore({
  reducer: { auth, car, rentals, review },
});

export default store;
