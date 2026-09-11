import { rootRoute } from "../root";

import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

export const boardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/boards",
  component: lazyRouteComponent(() => import("@pages/boards"), "BoardsPage"),
});
