import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import useAuthStore from "./authStore";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      status: "idle", // "idle" | "loading" | "succeeded" | "failed"
      error: null,

      fetchUser: async () => {
        const token = useAuthStore.getState().token; // Get token from authStore
        if (!token) {
          set({ error: "No token available", status: "failed" });
          return;
        }

        try {
          set({ status: "loading" });

          const response = await axios.post(
            "https://api.meebuddy.com/app/v4/user",
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

          set({ user: response.data, status: "succeeded", error: null });
        } catch (error) {
          set({
            error: error.response?.data || "Failed to fetch user data",
            status: "failed",
          });
        }
      },

      clearUser: () => set({ user: null, status: "idle", error: null }),
    }),
    {
      name: "user-storage", // Key for localStorage
      getStorage: () => localStorage, // Persist in localStorage
    }
  )
);

export default useUserStore;
