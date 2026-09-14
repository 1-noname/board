import type { LoginFormData } from "../model/schemes";
import type { AuthResponse } from "../model/types";

import { api } from "@shared/api/base";
import { getApiErrorMessage } from "@shared/lib/getApiErrorMessage";
import { useAuthStore } from "@shared/store/authStore";
import { useToastStore } from "@shared/store/useToastStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const loginRequest = async (
  dto: LoginFormData,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", dto);

  return data;
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);
  const showError = useToastStore((state) => state.showError);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ user, refreshToken, accessToken }) => {
      setUser(user);

      setTokens({ refreshToken, accessToken });

      navigate({ to: "/boards" });
    },
    onError: (error) => {
      showError(getApiErrorMessage(error));
    },
  });
};
