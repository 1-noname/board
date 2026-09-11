import { ToastContainer } from "@shared/ui";
import { PageLoader } from "@shared/ui";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ToastContainer />
    </>
  ),
  pendingComponent: PageLoader,
  notFoundComponent: () => <div>Not found page</div>,
});
