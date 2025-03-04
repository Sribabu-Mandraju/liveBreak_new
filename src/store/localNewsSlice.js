import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch local news posts asynchronously
export const fetchLocalNews = createAsyncThunk(
  "localNews/fetchLocalNews",
  async (payload = {}, { getState, rejectWithValue }) => {
    const { lastId, hasMore } = getState().localNews;
    const token = getState().auth.token; // Get token from auth state
    if (!token) return rejectWithValue("No token available");
    if (!hasMore) return rejectWithValue("No more local news available.");

    try {
      const response = await axios.post(
        `${BASE_URL}/news/local/feed`,
        {
          village: payload.village || "",
          mandal: payload.mandal || "",
          district: payload.district || "",
          state: payload.state || "",
          last_id: payload.last_id || lastId,
          location_name: payload.location_name || "",
          location_type: payload.location_type || "district",
          version: "new",
        },
        {
          headers: {
            "X-News-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjY3YzZjZmUzYmUwZTdkZjYzNGY5YzZjZCJ9LCJpYXQiOjE3NDEwODU4NTAsImV4cCI6MTc3MjYyMTg1MH0.Z7EzuZ42NEs12THDDUmiFpUBMxkcPW2gboJSs2EPcb4",
          },
        }
      );

      const newPosts = response.data.data || [];
      const lastPost =
        newPosts.length > 0 ? newPosts[newPosts.length - 1]._id : "";

      return { newPosts, lastPost };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch local news"
      );
    }
  }
);

// Add new async thunk for handling likes in local news
export const updateLocalNewsLike = createAsyncThunk(
  "localNews/updateLocalNewsLike",
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
            "X-News-Token": token,
          },
        }
      );

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

const localNewsSlice = createSlice({
  name: "localNews",
  initialState: {
    posts: [],
    lastId: "",
    loading: false,
    hasMore: true,
    locationInfo: {
      village: "",
      mandal: "",
      district: "",
      state: "",
      location_name: "",
      location_type: "district",
    },
  },
  reducers: {
    clearLocalNews: (state) => {
      state.posts = [];
      state.lastId = "";
      state.hasMore = true;
    },
    setLocationInfo: (state, action) => {
      state.locationInfo = {
        ...state.locationInfo,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocalNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocalNews.fulfilled, (state, action) => {
        const { newPosts, lastPost } = action.payload;
        state.posts = [...state.posts, ...newPosts];
        state.lastId = lastPost;
        state.hasMore = newPosts.length > 0;
        state.loading = false;
      })
      .addCase(fetchLocalNews.rejected, (state, action) => {
        console.error("Error fetching local news:", action.payload);
        state.loading = false;
        state.hasMore = false;
      })
      .addCase(updateLocalNewsLike.fulfilled, (state, action) => {
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
      .addCase(updateLocalNewsLike.rejected, (state, action) => {
        console.error("Error updating like:", action.payload);
      });
  },
});

export const { clearLocalNews, setLocationInfo } = localNewsSlice.actions;
export default localNewsSlice.reducer;
