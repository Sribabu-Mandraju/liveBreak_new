import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch categories asynchronously
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axios.get(`${BASE_URL}/news/categories`, {
        headers: {
          "X-News-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjYyMzZiZWQ5NzcwNDlmMDM1MGQ5OWZmMyJ9LCJpYXQiOjE3NDExNDk1NTIsImV4cCI6MTc3MjY4NTU1Mn0.6zvHQznRR-VriD3Gd8iGxLkeLE1weqvM0Pl0t7ykaZE",
        },
      });

      if (!response.data || !response.data.data) {
        return rejectWithValue("Invalid response format from server");
      }

      return response.data.data;
    } catch (error) {
      console.error(
        "Categories fetch error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

// Toggle block push notifications
export const toggleBlockPushNotify = createAsyncThunk(
  "categories/toggleBlockPushNotify",
  async ({ category_id, checked }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const payload = {
        category_id,
        checked,
        version: "new",
      };

      const response = await axios.post(
        `${BASE_URL}/news/category/block_push_notify`,
        payload,
        {
          headers: {
            "X-News-Token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjYyMzZiZWQ5NzcwNDlmMDM1MGQ5OWZmMyJ9LCJpYXQiOjE3NDExNDk1NTIsImV4cCI6MTc3MjY4NTU1Mn0.6zvHQznRR-VriD3Gd8iGxLkeLE1weqvM0Pl0t7ykaZE",
          },
        }
      );

      if (!response.data || !response.data.data) {
        return rejectWithValue("Invalid response format from server");
      }

      // Return the original payload for state update
      return {
        category_id,
        checked,
        userId: getState().auth.user?._id,
      };
    } catch (error) {
      console.error(
        "Block push notify toggle error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle push notifications"
      );
    }
  }
);

// Toggle block feed
export const toggleBlockFeed = createAsyncThunk(
  "categories/toggleBlockFeed",
  async ({ category_id, checked }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const payload = {
        category_id,
        checked,
        version: "new",
      };

      const response = await axios.post(
        `${BASE_URL}/news/category/block_feed`,
        payload,
        {
          headers: {
            "X-News-Token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjYyMzZiZWQ5NzcwNDlmMDM1MGQ5OWZmMyJ9LCJpYXQiOjE3NDExNDk1NTIsImV4cCI6MTc3MjY4NTU1Mn0.6zvHQznRR-VriD3Gd8iGxLkeLE1weqvM0Pl0t7ykaZE",
          },
        }
      );

      if (!response.data || !response.data.data) {
        return rejectWithValue("Invalid response format from server");
      }

      // Return the original payload for state update
      return {
        category_id,
        checked,
        userId: getState().auth.user?._id,
      };
    } catch (error) {
      console.error(
        "Block feed toggle error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle feed block"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearCategories: (state) => {
      state.items = [];
      state.lastFetched = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error fetching categories:", action.payload);
      })
      // Toggle Block Push Notify
      .addCase(toggleBlockPushNotify.fulfilled, (state, action) => {
        const { category_id, checked, userId } = action.payload;
        const category = state.items.find((cat) => cat._id === category_id);

        if (category) {
          const userObj = { _id: userId, id: userId };

          if (checked) {
            // Add user to blocked_push_notify_users if not already present
            if (
              !category.blocked_push_notify_users.some(
                (user) => user._id === userId
              )
            ) {
              category.blocked_push_notify_users.push(userObj);
            }
          } else {
            // Remove user from blocked_push_notify_users
            category.blocked_push_notify_users = category.blocked_push_notify_users.filter(
              (user) => user._id !== userId
            );
          }
        }
      })
      .addCase(toggleBlockPushNotify.rejected, (state, action) => {
        console.error("Error toggling push notifications:", action.payload);
        state.error = action.payload;
      })
      // Toggle Block Feed
      .addCase(toggleBlockFeed.fulfilled, (state, action) => {
        const { category_id, checked, userId } = action.payload;
        const category = state.items.find((cat) => cat._id === category_id);

        if (category) {
          const userObj = { _id: userId, id: userId };

          if (checked) {
            // Add user to blocked_feed_users if not already present
            if (
              !category.blocked_feed_users.some((user) => user._id === userId)
            ) {
              category.blocked_feed_users.push(userObj);
            }
          } else {
            // Remove user from blocked_feed_users
            category.blocked_feed_users = category.blocked_feed_users.filter(
              (user) => user._id !== userId
            );
          }
        }
      })
      .addCase(toggleBlockFeed.rejected, (state, action) => {
        console.error("Error toggling feed block:", action.payload);
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearCategories } = categorySlice.actions;

// Export selectors
export const selectAllCategories = (state) => state.categories.items;
export const selectCategoryById = (state, categoryId) =>
  state.categories.items.find((category) => category._id === categoryId);
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;

// Selectors for checking block status
export const selectIsBlockedPushNotify = (state, categoryId) => {
  const userId = state.auth.user?._id;
  const category = state.categories.items.find((cat) => cat._id === categoryId);
  return (
    category?.blocked_push_notify_users.some((user) => user._id === userId) ||
    false
  );
};

export const selectIsBlockedFeed = (state, categoryId) => {
  const userId = state.auth.user?._id;
  const category = state.categories.items.find((cat) => cat._id === categoryId);
  return (
    category?.blocked_feed_users.some((user) => user._id === userId) || false
  );
};

export default categorySlice.reducer;
