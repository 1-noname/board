import { PageLoader } from "@shared/ui/page-loader";
import { ToastContainer } from "@shared/ui/toast";
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
