import { useState } from "react";

import { getDragData } from "./dndData";

import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Column } from "@entities/column";
import { useReorderColumnMutation } from "@features/column/reorder";

export const useColumnDnd = (boardId: string, columns: Column[]) => {
  const { mutate: reorderColumn } = useReorderColumnMutation(boardId);

  const [localColumns, setLocalColumns] = useState(columns);
  const [prevColumns, setPrevColumns] = useState(columns);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  if (columns !== prevColumns) {
    setPrevColumns(columns);
    setLocalColumns(columns);
  }

  const onStart = (column: Column) => setActiveColumn(column);

  const onEnd = ({ active, over }: DragEndEvent) => {
    setActiveColumn(null);

    if (!over || active.id === over.id) return;
    if (getDragData(over)?.type !== "Column") return;

    const oldIndex = localColumns.findIndex((c) => c.id === active.id);
    const newIndex = localColumns.findIndex((c) => c.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    setLocalColumns((items) => arrayMove(items, oldIndex, newIndex));
    reorderColumn({ columnId: String(active.id), newOrder: newIndex });
  };

  const onCancel = () => setActiveColumn(null);

  return { localColumns, activeColumn, onStart, onEnd, onCancel };
};
