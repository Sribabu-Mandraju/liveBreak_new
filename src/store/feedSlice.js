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
      const lastPost =
        newPosts.length > 0 ? newPosts[newPosts.length - 1]._id : "";

      return { newPosts, lastPost };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
  }
);

// Add new async thunk for handling likes
export const updatePostLike = createAsyncThunk(
  "feed/updatePostLike",
  async ({ post_id }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axios.post(
        `${BASE_URL}/news/post/like`,
        {
          post_id,
          version: "new",
        },
        {
          headers: {
            "X-News-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjY3YzAzNjI0YmUwZTdkZjYzNGI5OTY3MyJ9LCJpYXQiOjE3NDA2NTMyOTYsImV4cCI6MTc3MjE4OTI5Nn0.41cCSbwDPcEEovcYO81hQZ-4uM1S56eWtibwwybx9dw",
          },
        }
      );

      // Check if response has the expected structure
      if (!response.data || !response.data.data || !response.data.data.post) {
        return rejectWithValue("Invalid response format from server");
      }

      return {
        post_id,
        likes: response.data.data.post.likes,
        liked_users: response.data.data.post.liked_users,
        dislikes: response.data.data.post.dislikes,
        disliked_users: response.data.data.post.disliked_users,
      };
    } catch (error) {
      console.error(
        "Like update error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to update like"
      );
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
      })
      .addCase(updatePostLike.fulfilled, (state, action) => {
        const {
          post_id,
          likes,
          liked_users,
          dislikes,
          disliked_users,
        } = action.payload;
        const post = state.posts.find((post) => post._id === post_id);
        if (post) {
          post.likes = likes;
          post.liked_users = liked_users;
          post.dislikes = dislikes;
          post.disliked_users = disliked_users;
        }
      })
      .addCase(updatePostLike.rejected, (state, action) => {
        console.error("Error updating like:", action.payload);
      });
  },
});

export const { clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
