import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("auth-token") || null,
    newsToken: localStorage.getItem("news-token") || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("auth-token", action.payload);
    },
    setNewsToken: (state, action) => {
      state.newsToken = action.payload;
      localStorage.setItem("news-token", action.payload);
    },
    clearTokens: (state) => {
      state.token = null;
      state.newsToken = null;
      localStorage.removeItem("auth-token");
      localStorage.removeItem("news-token");
    },
  },
});

export const { setToken, setNewsToken, clearTokens } = authSlice.actions;
export default authSlice.reducer;
