import { api } from "@shared/api/base";
import { getApiErrorMessage } from "@shared/lib/getApiErrorMessage";
import { useToastStore } from "@shared/store/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteBoardRequest = async (boardId: string) => {
  const { data } = await api.delete<{ message: string }>(`/boards/${boardId}`);

  return data;
};

export const useDeleteBoardMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: deleteBoardRequest,
    onSuccess: () => {
      showToast("Board deleted successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: (error) => {
      showToast(getApiErrorMessage(error), "error");
    },
  });
};
