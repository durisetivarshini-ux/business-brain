import { create } from "zustand";

export const useAppStore = create((set) => ({
  user: {
    name: "Admin User",
    email: "admin@company.com",
    role: "Super Admin"
  },
  setUser: (user) => set({ user }),
  
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
