import type { Column } from "@entities/column";
import { api } from "@shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ReorderColumnParams {
  boardId: string;
  columnId: string;
  newOrder: number;
}

type ReorderColumnPayload = Omit<ReorderColumnParams, "boardId">;

const reorderColumnRequest = async ({
  boardId,
  columnId,
  newOrder,
}: ReorderColumnParams) => {
  const { data } = await api.patch(
    `/boards/${boardId}/columns/${columnId}/order`,
    { newOrder },
  );

  return data;
};

export const useReorderColumnMutation = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReorderColumnPayload) =>
      reorderColumnRequest({ boardId, ...payload }),
    onMutate: async ({ columnId, newOrder }) => {
      await queryClient.cancelQueries({ queryKey: ["columns", boardId] });

      const prevColumns = queryClient.getQueryData<Column[]>([
        "columns",
        boardId,
      ]);

      if (prevColumns) {
        const oldIndex = prevColumns.findIndex(
          (column) => column.id === columnId,
        );

        if (oldIndex == -1) {
          const updatedColumns = [...prevColumns];

          const [movedColumn] = updatedColumns.splice(oldIndex, 1);

          updatedColumns.splice(newOrder, 0, movedColumn);

          queryClient.setQueryData(["columns", boardId], updatedColumns);
        }
      }

      return { prevColumns };
    },
    onError: (_err, _variable, omMutateResult) => {
      if (omMutateResult?.prevColumns) {
        queryClient.setQueryData(
          ["columns", boardId],
          omMutateResult.prevColumns,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", boardId] });
    },
  });
};
