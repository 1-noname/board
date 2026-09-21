import type { CreateBoardFormData } from "../model/schema";

import { boardSchema } from "@entities/board/model/schema";
import { api } from "@shared/api/base";
import { getApiErrorMessage } from "@shared/lib/getApiErrorMessage";
import { useToastStore } from "@shared/store/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createBoardRequest = async (dto: CreateBoardFormData) => {
  const { data } = await api.post("/boards", dto);

  return boardSchema.parse(data);
};

export const useCreateBoardMutation = () => {
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBoardRequest,
    onSuccess: () => {
      showToast("Board created successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: (error) => {
      showToast(getApiErrorMessage(error), "error");
    },
  });
};
