import { rootRoute } from "../root";

import { BoardPage } from "@pages/board";
import { useAuthStore } from "@shared/store/authStore";
import { createRoute, redirect } from "@tanstack/react-router";

export const boardDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/boards/$boardId",
  beforeLoad: () => {
    const isAuthenticated = !!useAuthStore.getState().accessToken;

    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: BoardPage,
});
