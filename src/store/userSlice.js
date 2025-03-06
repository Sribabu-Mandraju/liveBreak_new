import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch user async thunk
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Get token from auth state
    if (!token) return rejectWithValue("No token available");

    try {
      const response = await axios.post(
        `${BASE_URL}/user`,
        {
          device_uuid: null,
          fcm_meenews_token: "",
          onsignal_id: "",
          version: "new",
        },
        {
          headers: {
            "X-Meebuddy-Token": token, // Pass token in header
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user data"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },

  // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RhdGEiOnsiaWQiOiI1ZmZkZTk4MmZkYjEzNTM2YjdjZDMwYzkifSwiY2VudGVyX2RhdGEiOnsidmlsbGFnZV9pZCI6IjVmZmRlOTNhNTI4YmViMzUyYWZiYmU2OCIsImlkIjoiNWZmZGU5MmI2NTYzZmQzNGM0NjdlZTc0IiwiZGVsaXZlcnlfY29zdCI6MjB9LCJpYXQiOjE3NDExNjUwNjMsImV4cCI6MTc3MjcwMTA2M30.FgETDSSNbvk4Z1JrnBt9NW5uDrI1XzdpQu1VnUhUFR0"
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RhdGEiOnsiaWQiOiI1ZmZkZTk4MmZkYjEzNTM2YjdjZDMwYzkifSwiY2VudGVyX2RhdGEiOnsidmlsbGFnZV9pZCI6IjVmZmRlOTNhNTI4YmViMzUyYWZiYmU2OCIsImlkIjoiNWZmZGU5MmI2NTYzZmQzNGM0NjdlZTc0IiwiZGVsaXZlcnlfY29zdCI6MjB9LCJpYXQiOjE3NDExNjUwNjMsImV4cCI6MTc3MjcwMTA2M30.FgETDSSNbvk4Z1JrnBt9NW5uDrI1XzdpQu1VnUhUFR0

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
