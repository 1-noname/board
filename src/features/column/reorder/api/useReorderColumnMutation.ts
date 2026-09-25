import { arrayMove } from "@dnd-kit/sortable";
import type { Column } from "@entities/column";
import { api } from "@shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ReorderColumnParams {
  boardId: string;
  columnId: string;
  newOrder: number;
}

export const useReorderColumnMutation = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      columnId,
      newOrder,
    }: Omit<ReorderColumnParams, "boardId">) => {
      const { data } = await api.patch(
        `/boards/${boardId}/columns/${columnId}/order`,
        {
          newOrder,
        },
      );
      return data;
    },

    onMutate: async ({ columnId, newOrder }) => {
      queryClient.cancelQueries({ queryKey: ["columns", boardId] });

      const prevColumns = queryClient.getQueryData<Column[]>([
        "columns",
        boardId,
      ]);

      if (prevColumns) {
        const oldIndex = prevColumns.findIndex((col) => col.id === columnId);

        if (oldIndex !== -1) {
          const updatedColumns = arrayMove(prevColumns, oldIndex, newOrder);
          queryClient.setQueryData(["columns", boardId], updatedColumns);
        }
      }

      return { prevColumns };
    },

    onError: (_err, _variables, onMutate) => {
      if (onMutate?.prevColumns) {
        queryClient.setQueryData(["columns", boardId], onMutate.prevColumns);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
};
