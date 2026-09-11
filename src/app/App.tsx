import { router } from "./providers/router/routeTree";

import { queryClient } from "@shared/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

// Add please theme for MUI with all colors, fonts, etc.
// See all possible properties https://mui.com/material-ui/customization/default-theme/
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
