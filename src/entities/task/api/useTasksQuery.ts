import { tasksResponseSchema } from "../model/schema";

import { api } from "@shared/api/base";
import { useQuery } from "@tanstack/react-query";

const getTasksRequest = async (boardId: string, columnId: string) => {
  const { data } = await api.get(
    `/boards/${boardId}/columns/${columnId}/tasks`,
  );

  const parsedData = tasksResponseSchema.parse(data);
  return parsedData.tasks;
};

export const useTasksQuery = (boardId: string, columnId: string) => {
  return useQuery({
    queryKey: ["tasks", boardId, columnId],
    queryFn: () => getTasksRequest(boardId, columnId),
    enabled: !!(boardId && columnId),
  });
};
