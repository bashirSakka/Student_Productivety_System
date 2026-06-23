import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      id: null,
      setId: (id) => set({ id }),
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ token: null, user: null, id: null }),
    }),
    { name: "auth" }, // localStorage key
  ),
);
export default useAuthStore;
