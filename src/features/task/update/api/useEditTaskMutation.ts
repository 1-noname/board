import type { Task } from "@entities/task";
import type { TaskFormPayload } from "@entities/task";
import { api } from "@shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditTaskParams {
  boardId: string;
  columnId: string;
  taskId: string;
  payload: TaskFormPayload;
}

const editTaskRequest = async ({
  boardId,
  columnId,
  taskId,
  payload,
}: EditTaskParams): Promise<Task> => {
  const { data } = await api.patch<Task>(
    `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    payload,
  );
  return data;
};

export const useEditTaskMutation = (boardId: string, columnId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: TaskFormPayload;
    }) => editTaskRequest({ boardId, columnId, taskId, payload }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", boardId, columnId],
      });
    },
  });
};
