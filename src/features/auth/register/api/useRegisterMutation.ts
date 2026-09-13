import type { RegisterFormData } from "../model/register.schema";

import { api } from "@shared/api/base";
import { getApiErrorMessage } from "@shared/lib/getApiErrorMessage";
import { useToastStore } from "@shared/store/useToastStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: async (dto: RegisterFormData) => {
      const response = await api.post<{ message: string }>(
        "/auth/register",
        dto,
      );
      return response.data;
    },
    onSuccess: (data) => {
      showToast(data.message || "You have successfully registered.", "success");
      navigate({ to: "/login" });
    },
    onError: (error) => {
      showToast(getApiErrorMessage(error), "error");
    },
  });
};
