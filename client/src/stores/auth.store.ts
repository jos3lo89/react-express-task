import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthStore {
  user: User | null;
  isAuth: boolean;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  clearStore: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      token: null,
      login: (user: User, token: string) => set({ user, isAuth: true, token }),
      logout: () => set({ user: null, isAuth: false, token: null }),
      clearStore: () => {
        useAuthStore.persist.clearStorage();
      },
    }),
    { name: "auth-store", storage: createJSONStorage(() => localStorage) }
  )
);
