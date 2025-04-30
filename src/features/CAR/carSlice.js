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

      // get single car 
      .addCase(getCar.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.car = action.payload;
        state.isError = false;
      })
      .addCase(getCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCars.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(addCars.rejected, (state, action) => {
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
        state.cars = state.cars.map((item) => item._id === action.payload._id ?action.payload : item );
        state.edit = {car : {} , isEdit : false}
        state.isError = false;
      })
      .addCase(updateCarDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(findCar.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(findCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload;
        state.isError = false;
      })
      .addCase(findCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { editCar } = carSlice.actions;
export default carSlice.reducer;

// Get all cars
export const getCars = createAsyncThunk("FETCH/CARS", async (_, thunkAPI) => {
  try {
    return await carService.fetchCars();
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
})

// Get single car

export const getCar = createAsyncThunk("FETCH/CAR", async (id, thunkAPI) => {
  try {
    return await carService.fetchCar(id);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// add car Admin

export const addCars = createAsyncThunk(
  "CAR/ADD",
  async (formData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;

      return await carService.createCar(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeCar = createAsyncThunk(
  "CAR/REMOVE",
  async (id, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;

      return await carService.deleteCar(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCarDetails = createAsyncThunk("CAR/UPDATE",async (formData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;

      return await carService.updateCar(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  find searched car 
export const findCar = createAsyncThunk(
  "FETCH/FIND",
  async (query, thunkAPI) => {
    try {
      return await carService.searchCar(query);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
