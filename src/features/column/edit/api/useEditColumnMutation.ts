import { api } from "@shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface editColumnRequestProps {
  boardId: string;
  columnId: string;
  title: string;
}

type EditColumnParams = Omit<editColumnRequestProps, "boardId">;

const editColumnRequest = async ({
  boardId,
  columnId,
  title,
}: editColumnRequestProps) => {
  const { data } = await api.put(`/boards/${boardId}/columns/${columnId}`, {
    title,
  });
  return data;
};

export const useEditColumnMutation = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: EditColumnParams) =>
      editColumnRequest({ boardId, ...params }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
};
