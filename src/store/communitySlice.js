import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch suggested communities async thunk
export const fetchSuggestedCommunities = createAsyncThunk(
  "community/fetchSuggestedCommunities",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        console.error("Token not found in auth state");
        return rejectWithValue("Authentication token is missing");
      }

      console.log("Making API request with token:", token);

      const response = await axios.post(
        `${BASE_URL}/community/suggested_communities`,
        {
          version: "new",
        },
        {
          headers: {
            "X-Meebuddy-Token":token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        return rejectWithValue("No data received from server");
      }

      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch suggested communities"
      );
    }
  }
);

const communitySlice = createSlice({
  name: "community",
  initialState: {
    suggestedCommunities: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    clearCommunities: (state) => {
      state.suggestedCommunities = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestedCommunities.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSuggestedCommunities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suggestedCommunities = action.payload;
        state.error = null;
      })
      .addCase(fetchSuggestedCommunities.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "An error occurred while fetching communities";
        console.error("Reducer Error State:", action.payload);
      });
  },
});

export const { clearCommunities } = communitySlice.actions;
export default communitySlice.reducer;
