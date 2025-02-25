import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useFeedStore = create(
  persist(
    (set, get) => ({
      posts: [],
      lastId: "", // Tracks last fetched post ID
      loading: false,
      hasMore: true, // Determines if more data is available

      fetchPosts: async () => {
        if (get().loading || !get().hasMore) return;

        set({ loading: true });

        try {
          const response = await axios.post("https://api.meebuddy.com/app/v4/common/feed", {
            post_id: "",
            last_id: get().lastId, // Use the last ID from previous data
            type: "",
            bookmarks: false,
            tag_id: "",
            version: "new",
          });

          const newPosts = response.data.data || [];
          const lastPost = newPosts.length > 0 ? newPosts[newPosts.length - 1]._id : "";

          set((state) => ({
            posts: [...state.posts, ...newPosts], // Append new data
            lastId: lastPost,
            hasMore: newPosts.length > 0, // Stop fetching if no new posts
            loading: false,
          }));
        } catch (error) {
          console.error("Error fetching posts:", error);
          set({ loading: false, hasMore: false });
        }
      },
    }),
    {
      name: "feed-storage", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useFeedStore;
