import { PageLoader } from "@shared/index";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  pendingComponent: PageLoader,
  notFoundComponent: () => <div>Not found page</div>,
});
