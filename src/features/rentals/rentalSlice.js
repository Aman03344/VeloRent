import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rentalService from "./rentalService";

const rentalSlice = createSlice({
  name: "rentals",
  initialState: {
    rentals: [],
    rental: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRentalsFormAdmin.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getRentalsFormAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rentals = action.payload;
        state.isError = false;
      })
      .addCase(getRentalsFormAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRentalsForUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getRentalsForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rentals = action.payload;
        state.isError = false;
      })
      .addCase(getRentalsForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRental.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRental.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rental = action.payload;
        state.isSuccess = true;
      })
      .addCase(getRental.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addRental.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addRental.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rental = action.payload;
        state.isError = false;
      })
      .addCase(addRental.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default rentalSlice.reducer;

// get all rentals for Admin
export const getRentalsFormAdmin = createAsyncThunk(
  "GET/RENTALS_ADMIN",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await rentalService.fetchRentalsFormAdmin(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all rentals for Admin
export const getRentalsForUser = createAsyncThunk(
  "GET/RENTALS_USER",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await rentalService.fetchRentalsForUser(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRental = createAsyncThunk(
  "GET/RENTAL",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await rentalService.fetchSingleRental(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addRental = createAsyncThunk(
  "RENTAL/ADD",
  async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    console.log(formData)
    try {
      return await rentalService.createRental(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
