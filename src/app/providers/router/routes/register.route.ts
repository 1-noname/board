import { rootRoute } from "../root";

import { RegisterPage } from "@pages/register";
import { useAuthStore } from "@shared/store/authStore";
import { createRoute, redirect } from "@tanstack/react-router";

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  beforeLoad: () => {
    const isAuth = !!useAuthStore.getState().accessToken;

    if (isAuth) throw redirect({ to: "/boards" });
  },
  component: RegisterPage,
});
