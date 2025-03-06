import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setToken } from "./authSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Async thunk for selecting location
export const selectLocation = createAsyncThunk(
  "location/selectLocation",
  async ({ village_id, token }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/common/location/select`,
        {
          type: "news",
          version: "new",
          village_id,
        },
        {
          headers: {
            "X-Meebuddy-Token": token,
          },
        }
      );

      // Save the new token from the response
      if (response.data.token) {
        dispatch(setToken(response.data.token));
      }

      return response.data.data; // Return only the location data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    selectedLocation: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(selectLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(selectLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedLocation = action.payload;
      })
      .addCase(selectLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;
