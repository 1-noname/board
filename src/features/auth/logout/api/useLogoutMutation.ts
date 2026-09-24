import { api } from "@shared/api/base";
import { useAuthStore } from "@shared/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const clearStore = useAuthStore((state) => state.clearStore);

  return useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onSettled: () => {
      clearStore();
      queryClient.clear();
      navigate({ to: "/login" });
    },
  });
};
