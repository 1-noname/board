import { requireAuth } from "../helper/guards";
import { mainRoute } from "./main.route";

import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

export const profileRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "/profile",
  beforeLoad: requireAuth,
  component: lazyRouteComponent(() => import("@pages/profile"), "ProfilePage"),
});
