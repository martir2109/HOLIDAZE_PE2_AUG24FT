import { create } from "zustand";
import type { AuthStore } from "../interfaces/authstore";

/**
 * Zustand store for managing authentication state
 *
 * - Stores user, token, and apiKey
 * - login: saves data to localStorage and updates state.
 * - logout: clear data from localStorage and resets state.
 */
export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") ?? "null"),
  token: localStorage.getItem("token"),
  apiKey: localStorage.getItem("apiKey"),

  login: (user, token, apiKey) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("apiKey", apiKey);
    set({ user, token, apiKey });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("apiKey");
    set({ user: null, token: null, apiKey: null });
  },
}));
