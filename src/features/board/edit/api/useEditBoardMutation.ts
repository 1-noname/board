import type { EditBoardFormData } from "../model/schema";

import { boardSchema } from "@entities/board";
import { api } from "@shared/api/base";
import { getApiErrorMessage } from "@shared/lib/getApiErrorMessage";
import { useToastStore } from "@shared/store/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EdtoBoardParams {
  id: string;
  dto: EditBoardFormData;
}

const editBoardRequest = async ({ id, dto }: EdtoBoardParams) => {
  const { data } = await api.patch(`/boards/${id}`, dto);

  return boardSchema.parse(data);
};

export const useEditBoardMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: editBoardRequest,
    onSuccess: (updateBoard) => {
      showToast("Board updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["board", updateBoard.id] });
    },
    onError: (error) => {
      showToast(getApiErrorMessage(error), "error");
    },
  });
};
