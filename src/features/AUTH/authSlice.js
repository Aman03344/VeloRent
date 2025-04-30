import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userExist = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userExist || null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isError = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.isError = false;
      });
  },
});

export default authSlice.reducer;

// user register

export const registerUser = createAsyncThunk(
  "AUTH/REGISTER",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://car-rental-app-5d25.onrender.com/api/auth/register",
        formData
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      return await response.data;
    } catch (error) {
      const message = error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "AUTH/LOGIN",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://car-rental-app-5d25.onrender.com/api/auth/login",
        formData
      );
      localStorage.setItem("user", JSON.stringify(response.data));

      return await response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logOutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
  localStorage.removeItem("user");
});
