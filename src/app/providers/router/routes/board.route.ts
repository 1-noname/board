import { requireAuth } from "../helper/guards";
import { mainRoute } from "./main.route";

import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

export const boardDetailRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "/boards/$boardId",
  beforeLoad: requireAuth,
  component: lazyRouteComponent(() => import("@pages/board"), "BoardPage"),
});
