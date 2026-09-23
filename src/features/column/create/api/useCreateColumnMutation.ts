import { columnFormSchema } from "@entities/column";
import { api } from "@shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface createColumnRequestProps {
  boardId: string;
  title: string;
}

const createColumnRequest = async ({
  boardId,
  title,
}: createColumnRequestProps) => {
  const { data } = await api.post(`/boards/${boardId}/columns`, { title });

  return columnFormSchema.parse(data);
};

export const useCreateColumnMutation = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => createColumnRequest({ boardId, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
};
