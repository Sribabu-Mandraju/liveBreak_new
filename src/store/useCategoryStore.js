import { create } from "zustand";
import axios from "axios";

const API_URL = "https://api.meebuddy.com/app/v4/news/categories";
const NEWS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjY1NmMyNDM3M2NiNWE1MjMyYTRhMjFhNyJ9LCJpYXQiOjE3NDA1NTIyMDEsImV4cCI6MTc3MjA4ODIwMX0.8BVFq0DmbyRAWgVvtSb921evVDZ3CvTkiGU4ar7FWTE";

const useCategoryStore = create((set) => ({
  categories: [],
  loading: true,
  error: null,
  fetchCategories: async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { "X-News-Token": NEWS_TOKEN },
      });
      set({ categories: response.data.data, loading: false, error: null });
    } catch (error) {
      set({ error: "Failed to load categories", loading: false });
    }
  },
  toggleSetting: (categoryId, type) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? { ...category, [type]: !category[type] }
          : category
      ),
    })),
}));

export default useCategoryStore;
