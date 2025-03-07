import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchMagazines = createAsyncThunk(
  "feed/fetchMagazines",
  async (payload = {}, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/common/feed`, {
        last_id: "",
        post_type: "Magazine",
        version: "new",
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch magazines"
      );
    }
  }
);

const magazineSlice = createSlice({
  name: "magazines",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMagazines.pending, (state) => {
        state.loading = "loading";
        state.data = [];
        state.error = null;
      })
      .addCase(fetchMagazines.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = "loaded";
        state.error = null;
      })
      .addCase(fetchMagazines.rejected, (state, action) => {
        console.error("Error fetching posts:", action.payload);
        state.data = [];
        state.error = action.payload;
        state.loading = "loaded";
      });
  },
});

export const {} = magazineSlice.actions;
export default magazineSlice.reducer;
