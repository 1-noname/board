import { boardsResponseSchema } from "../model/schema";

import { api } from "@shared/api/base";
import { useQuery } from "@tanstack/react-query";

const getBoardsRequest = async () => {
  const { data } = await api.get("/boards");

  return boardsResponseSchema.parse(data);
};

export const useBoardsQuery = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoardsRequest,
  });
};
