import { api } from "@shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteTaskParams {
  boardId: string;
  columnId: string;
  taskId: string;
}

const deleteTaskRequest = async ({
  boardId,
  columnId,
  taskId,
}: DeleteTaskParams) => {
  const { data } = await api.delete(
    `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
  );

  return data;
};

export const useDeleteTaskMutation = (boardId: string, columnId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) =>
      deleteTaskRequest({ boardId, columnId, taskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", boardId, columnId] });
    },
  });
};
