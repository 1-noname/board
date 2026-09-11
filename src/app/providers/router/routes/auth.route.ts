import { rootRoute } from "../root";

import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: lazyRouteComponent(() => import("@pages/login"), "LoginPage"),
});
