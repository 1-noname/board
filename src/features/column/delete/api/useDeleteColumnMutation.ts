import { api } from "@shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteColumnParams {
  boardId: string;
  columnId: string;
}

const deleteColumnRequest = async ({
  boardId,
  columnId,
}: DeleteColumnParams) => {
  const { data } = await api.delete(`/boards/${boardId}/columns/${columnId}`);

  return data;
};

export const useDeleteColumnMutation = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnId: string) =>
      deleteColumnRequest({ boardId, columnId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
};
