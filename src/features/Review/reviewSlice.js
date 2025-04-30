import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

// Fetch reviews

// Create slice
const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    review: {},
    isLoadingReview: false,
    isSuccessReview: false,
    isErrorReview: false,
    messageReview: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsForAdmin.pending, (state) => {
        state.isLoadingReview = true;
      })
      .addCase(getReviewsForAdmin.fulfilled, (state, action) => {
        state.isLoadingReview = false;
        state.isSuccessReview = true;
        state.review = action.payload;
      })
      .addCase(getReviewsForAdmin.rejected, (state, action) => {
        state.isLoadingReview = false;
        state.isErrorReview = true;
        state.messageReview = action.payload;
      })

      // for users
      .addCase(getReviews.pending, (state) => {
        state.isLoadingReview = true;
        state.isSuccessReview = false
        state.isErrorReview = false
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoadingReview = false;
        state.isSuccessReview = true;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoadingReview = false;
        state.isErrorReview = true;
        state.messageReview = action.payload;
      })
      .addCase(addReview.pending, (state) => {
        state.isLoadingReview = true;
        state.isSuccessReview = false
        state.isErrorReview = false
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoadingReview = false;
        state.isSuccessReview = true;
        state.review = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoadingReview = false;
        state.isErrorReview = true;
        state.messageReview = action.payload;
      });
  },
});

export default reviewSlice.reducer;

export const getReviewsForAdmin = createAsyncThunk(
  "GET/REVIEWS_ADMIN",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await reviewService.fetchReviewsFromAdmin(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get reviwe for single car
export const getReviews = createAsyncThunk("GET/REVIEWS", async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  try {
    return await reviewService.fetchReview(id, token);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const addReview = createAsyncThunk("ADD/COMMENT",async(formData,thunkAPI)=>{
  const token = thunkAPI.getState().auth.user.token
  console.log(token);
  
  try {
  return await reviewService.createReview(formData,token)
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
})
