import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Async thunk for selecting location
export const selectLocation = createAsyncThunk(
  "location/selectLocation",
  async ({ village_id, token }, { rejectWithValue }) => {
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
      return response.data;
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
