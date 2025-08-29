import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });

      set({
        user: response.data.user,
        isAuthenticated: false, // User is not authenticated until email verification
        isLoading: false,
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error signing up";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw new Error(errorMessage);
    }
  },

  verifyEmail: async (code, email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { 
        code, 
        email 
      });
      
      set({ 
        user: response.data.user, 
        isAuthenticated: true, // Now user is authenticated after verification
        isLoading: false 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error verifying email";
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      throw new Error(errorMessage);
    }
  },

  // Add a method to clear errors
  clearError: () => set({ error: null }),

  // Add a method to check authentication status
  checkAuth: async () => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });

      console.log(error);
    }
  },
}));