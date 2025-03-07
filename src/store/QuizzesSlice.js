import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchQuizzes = createAsyncThunk(
  "feed/fetchQuizzes",
  async (payload = {}, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/common/feed/post_type`, {
        post_type: "Quiz",
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

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {} = quizSlice.actions;
export default quizSlice.reducer;
