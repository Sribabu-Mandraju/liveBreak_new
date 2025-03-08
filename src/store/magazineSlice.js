import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchMagazines = createAsyncThunk(
  "feed/fetchMagazines",
  async (payload = {}, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/common/feed`, {
        post_id: payload.post_id || "",
        last_id: payload.last_id || "",
        type: "Magazine",
        bookmarks: payload.bookmarks || false,
        tag_id: payload.tag_id || "",
        posted_by: payload.posted_by || "",
        isReporter: payload.isReporter || false,
        version: "new",
      });

      const newPosts = response.data.data || [];
      const lastPost =
        newPosts.length > 0 ? newPosts[newPosts.length - 1]._id : "";

      return { newPosts, lastPost };
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
    loading: false,
    error: null,
    lastId: "",
    hasMore: true,
  },
  reducers: {
    clearFeed: (state) => {
      state.data = [];
      state.lastId = "";
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMagazines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMagazines.fulfilled, (state, action) => {
        const { newPosts, lastPost } = action.payload;

        state.data = [...state.data, ...newPosts];
        state.lastId = lastPost;
        state.hasMore = newPosts.length > 0;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMagazines.rejected, (state, action) => {
        console.error("Error fetching posts:", action.payload);
        state.error = action.payload;
        state.loading = false;
        state.hasMore = false;
      });
  },
});

export const { clearFeed } = magazineSlice.actions;
export default magazineSlice.reducer;
