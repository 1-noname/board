import type { UpdateProfileFormData } from "../model/schema";

import { userSchema } from "@entities/user";
import { api } from "@shared/api/base";
import { getApiErrorMessage } from "@shared/lib/getApiErrorMessage";
import { useAuthStore } from "@shared/store/authStore";
import { useToastStore } from "@shared/store/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const updateProfileRequest = async (dto: UpdateProfileFormData) => {
  const { data } = await api.put("/users/profile", dto);
  return userSchema.parse(data);
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: (updatedUser) => {
      showToast("Name updated successfully", "success");
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      showToast(getApiErrorMessage(error), "error");
    },
  });
};
