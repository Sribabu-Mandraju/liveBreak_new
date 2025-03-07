import { configureStore } from "@reduxjs/toolkit";
import { saveState, loadState } from "./localStorageUtils";

import authSlice from "./authSlice";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import locationSlice from "./locationSlice";
import communitySlice from "./communitySlice";
import localNewsSlice from "./localNewsSlice";
import categorySlice from "./categorySlice";
import magazineSlice from "./magazineSlice";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    feed: feedSlice,
    location: locationSlice,
    community: communitySlice,
    localNews: localNewsSlice,
    categories: categorySlice,
    magazines: magazineSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    user: store.getState().user,
    feed: store.getState().feed,
    location: store.getState().location,
    community: store.getState().community,
    localNews: store.getState().localNews,
    categories: store.getState().categories,
    magazines: store.getState().magazines,
  });
});

export default store;
