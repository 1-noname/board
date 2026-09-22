import { rootRoute } from "../root";
import { AppLayout } from "../ui/AppLayout";

import { createRoute } from "@tanstack/react-router";

export const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main-route",
  component: AppLayout,
});
