import { rootRoute } from "../root";

import { useAuthStore } from "@shared/store/authStore";
import { createRoute, redirect } from "@tanstack/react-router";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const { accessToken } = useAuthStore.getState();
    throw redirect({ to: accessToken ? "/boards" : "/login" });
  },
});
