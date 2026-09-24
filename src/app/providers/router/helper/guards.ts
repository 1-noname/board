import { useAuthStore } from "@shared/store/authStore";
import { redirect } from "@tanstack/react-router";

export const requireAuth = () => {
  const isAuthenticated = !!useAuthStore.getState().accessToken;
  if (!isAuthenticated) {
    throw redirect({ to: "/login" });
  }
};

export const requireGuest = () => {
  const isAuthenticated = !!useAuthStore.getState().accessToken;
  if (isAuthenticated) {
    throw redirect({ to: "/boards" });
  }
};

export const redirectRoot = () => {
  const isAuthenticated = !!useAuthStore.getState().accessToken;
  throw redirect({ to: isAuthenticated ? "/boards" : "/login" });
};
