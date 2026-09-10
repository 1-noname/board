import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5,
      retry: (failureCount, error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;

          if (status && [400, 401, 403, 404].includes(status)) {
            return false;
          }
        }

        return failureCount < 3;
      },
    },
    mutations: {
      retry: false,
    },
  },
});
