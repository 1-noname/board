import { rootRoute } from "./root";
import { authRoute } from "./routes/auth.route";
import { boardsRoute } from "./routes/boards.route";
import { indexRoute } from "./routes/index.route";
import { registerRoute } from "./routes/register.route";

import { createRouter } from "@tanstack/react-router";

const routeTree = rootRoute.addChildren([
  indexRoute,
  boardsRoute,
  authRoute,
  registerRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
