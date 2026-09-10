import type { AuthResponse, LoginDto } from "../model/types";

import { api } from "@shared/api/base";
import { useAuthStore } from "@shared/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const loginRequest = async (dto: LoginDto): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", dto);

  return data;
};

export const useLoginMutation = () => {
  const navigation = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ user, refreshToken, accessToken }) => {
      setUser(user);

      setTokens({ refreshToken, accessToken });

      navigation({ to: "/boards" });
    },
  });
};
