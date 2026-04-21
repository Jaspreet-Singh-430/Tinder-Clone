import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
// import { Navigate } from "react-router-dom";
export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,
  signup: async (signupData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      console.log(res.data);
      set({ authUser: res.data.user.name });
      toast.success("User created successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  login: async (loginData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", loginData);
      console.log(res.data);
      set({ authUser: res.data.user.name });
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    //   if (res.status === 200) {
    //     console.log(res.status);
        set({ authUser: null });
        toast.success("Logged out successfully");
        // Navigate("/auth");
    //   }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  },
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      console.log(res.data);
      set({ authUser: res.data.user.name });
    } catch (err) {
      console.log(err);
      set({ authUser: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
