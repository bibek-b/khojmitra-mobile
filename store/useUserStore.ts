import { UseUserStoreType } from "@/types/useUserStore";
import { create } from "zustand";

export const useUserStore = create<UseUserStoreType>((set) => ({
  userId: "",
  fullname: "",
  email: "",
  avatar: "",
  setUser: (value) => set((state) => ({ ...state, ...value })),
}));
