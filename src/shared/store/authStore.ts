import type { User } from "@entities/user/model/schema";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStoreState {
  user: User | null;
  refreshToken: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: { refreshToken: string; accessToken: string }) => void;
  clearStore: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      refreshToken: null,
      accessToken: null,

      get isAuthenticated() {
        return Boolean(get().accessToken);
      },

      setUser: (user) => set({ user }),

      setTokens: ({ refreshToken, accessToken }) =>
        set({ refreshToken, accessToken }),

      clearStore: () =>
        set({ user: null, refreshToken: null, accessToken: null }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        refreshToken: state.refreshToken,
        accessToken: state.accessToken,
      }),
    },
  ),
);
