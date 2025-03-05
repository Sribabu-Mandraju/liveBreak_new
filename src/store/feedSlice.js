import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch posts asynchronously
export const fetchPosts = createAsyncThunk(
  "feed/fetchPosts",
  async (payload = {}, { getState, rejectWithValue }) => {
    const { lastId, hasMore } = getState().feed;
    if (!hasMore) return rejectWithValue("No more posts available.");

    try {
      const response = await axios.post(`${BASE_URL}/common/feed`, {
        post_id: payload.post_id || "",
        last_id: payload.last_id || lastId,
        type: payload.type || "",
        bookmarks: payload.bookmarks || false,
        tag_id: payload.tag_id || "",
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
            "X-News-Token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjYyMzZiZWQ5NzcwNDlmMDM1MGQ5OWZmMyJ9LCJpYXQiOjE3NDExNDk1NTIsImV4cCI6MTc3MjY4NTU1Mn0.6zvHQznRR-VriD3Gd8iGxLkeLE1weqvM0Pl0t7ykaZE",
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

// Add new async thunk for handling dislikes
export const updatePostDislike = createAsyncThunk(
  "feed/updatePostDislike",
  async ({ post_id }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axios.post(
        `${BASE_URL}/news/post/dislike`,
        {
          post_id,
          version: "new",
        },
        {
          headers: {
            "X-News-Token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjYyMzZiZWQ5NzcwNDlmMDM1MGQ5OWZmMyJ9LCJpYXQiOjE3NDExNDk1NTIsImV4cCI6MTc3MjY4NTU1Mn0.6zvHQznRR-VriD3Gd8iGxLkeLE1weqvM0Pl0t7ykaZE",
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
        "Dislike update error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to update dislike"
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
      })
      .addCase(updatePostDislike.fulfilled, (state, action) => {
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
      .addCase(updatePostDislike.rejected, (state, action) => {
        console.error("Error updating dislike:", action.payload);
      });
  },
});

export const { clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
