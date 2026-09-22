import { NotFound } from "./ui/NotFound";
import { RootLayout } from "./ui/RootLayout";

import { PageLoader } from "@shared/ui/page-loader";
import { createRootRoute } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: RootLayout,
  pendingComponent: PageLoader,
  notFoundComponent: NotFound,
});
