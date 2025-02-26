import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch posts asynchronously
export const fetchPosts = createAsyncThunk(
  "feed/fetchPosts",
  async (_, { getState, rejectWithValue }) => {
    const { lastId, hasMore } = getState().feed;
    if (!hasMore) return rejectWithValue("No more posts available.");

    try {
      const response = await axios.post(`${BASE_URL}/common/feed`, {
        post_id: "",
        last_id: lastId, 
        type: "",
        bookmarks: false,
        tag_id: "",
        version: "new",
      });

      const newPosts = response.data.data || [];
      const lastPost = newPosts.length > 0 ? newPosts[newPosts.length - 1]._id : "";

      return { newPosts, lastPost };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    posts: [],
    lastId: "",
    loading: false,
    hasMore: true,
  },
  reducers: {
    clearFeed: (state) => {
      state.posts = [];
      state.lastId = "";
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const { newPosts, lastPost } = action.payload;

        state.posts = [...state.posts, ...newPosts];
        state.lastId = lastPost;
        state.hasMore = newPosts.length > 0;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.error("Error fetching posts:", action.payload);
        state.loading = false;
        state.hasMore = false;
      });
  },
});

export const { clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
  