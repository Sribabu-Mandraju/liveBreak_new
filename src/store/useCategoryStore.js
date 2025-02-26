import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/news/categories`;

const useCategoryStore = create((set) => ({
  categories: [],
  loading: true,
  error: null,
  fetchCategories: async () => {
    const token = useAuthStore.getState().token;
    try {
      const response = await axios.get(API_URL, {
        headers: { "X-News-Token": token },
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
