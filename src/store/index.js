import { configureStore } from "@reduxjs/toolkit";
import { saveState, loadState } from "./localStorageUtils";

import authSlice from "./authSlice";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import locationSlice from "./locationSlice";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    feed: feedSlice,
    location: locationSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    user: store.getState().user,
    feed: store.getState().feed,
    location: store.getState().location,
  });
});

export default store;
