import { requireGuest } from "../helper/guards";
import { rootRoute } from "../root";

import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  beforeLoad: requireGuest,
  component: lazyRouteComponent(
    () => import("@pages/register"),
    "RegisterPage",
  ),
});
