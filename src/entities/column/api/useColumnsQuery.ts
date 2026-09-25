import { columnsResponseSchema } from "../model/schema";

import { api } from "@shared/api/base";
import { useQuery } from "@tanstack/react-query";

const getColumnsRequest = async (boardId: string) => {
  const { data } = await api.get(`/boards/${boardId}/columns`);
  const parsed = columnsResponseSchema.parse(data);

  return parsed.columns;
};

export const useColumnsQuery = (boardId: string) => {
  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => getColumnsRequest(boardId),
    enabled: !!boardId,
  });
};
