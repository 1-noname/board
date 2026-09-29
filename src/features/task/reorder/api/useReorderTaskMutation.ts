import { type Task } from "@entities/task";
import { api } from "@shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ReorderTaskPayload {
  newColumnId: string;
  newOrder: number;
}

interface ReorderTaskParams {
  sourceColumnId: string;
  taskId: string;
  payload: ReorderTaskPayload;
}

export const useReorderTaskMutation = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sourceColumnId,
      taskId,
      payload,
    }: ReorderTaskParams) => {
      const { data } = await api.patch<Task>(
        `/boards/${boardId}/columns/${sourceColumnId}/tasks/${taskId}/order`,
        payload,
      );

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", boardId, variables.sourceColumnId],
      });
      if (variables.sourceColumnId !== variables.payload.newColumnId) {
        queryClient.invalidateQueries({
          queryKey: ["tasks", boardId, variables.payload.newColumnId],
        });
      }
    },
  });
};
