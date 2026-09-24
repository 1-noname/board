import { api } from "@shared/api/base";
import { getApiErrorMessage } from "@shared/lib/getApiErrorMessage";
import { useAuthStore } from "@shared/store/authStore";
import { useToastStore } from "@shared/store/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const deleteAccountRequest = async () => {
  const { data } = await api.delete<{ message: string }>("/users/profile");
  return data;
};

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const clearStore = useAuthStore((state) => state.clearStore);
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: deleteAccountRequest,
    onSuccess: (data) => {
      showToast(data.message || "Account deleted successfully", "success");
      clearStore();
      queryClient.clear();
      navigate({ to: "/login" });
    },
    onError: (error) => {
      showToast(getApiErrorMessage(error), "error");
    },
  });
};
