import type { Task, TaskFormPayload } from "@entities/task";
import { api } from "@shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createTaskRequest = async (
  boardId: string,
  columnId: string,
  payload: TaskFormPayload,
): Promise<Task> => {
  const { data } = await api.post<Task>(
    `/boards/${boardId}/columns/${columnId}/tasks`,
    payload,
  );
  return data;
};

export const useCreateTaskMutation = (boardId: string, columnId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TaskFormPayload) =>
      createTaskRequest(boardId, columnId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", boardId, columnId] });
    },
  });
};
