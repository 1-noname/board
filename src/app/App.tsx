import { router } from "./providers/router/routeTree";
import { AppThemeProvider } from "./providers/theme";

import { queryClient } from "@shared/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <RouterProvider router={router} />
      </AppThemeProvider>
    </QueryClientProvider>
  );
};
