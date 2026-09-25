import { type ReactNode, useState } from "react";

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { type Column, ColumnCard } from "@entities/column";
import { DeleteColumnDialog } from "@features/column/delete";
import { EditColumnDialog } from "@features/column/edit";
import { useReorderColumnMutation } from "@features/column/reorder";
import { Box } from "@mui/material";

interface ColumnListProps {
  boardId: string;
  columns: Column[];
  renderTasks: (columnId: string) => ReactNode;
}

export const ColumnList = ({
  boardId,
  columns,
  renderTasks,
}: ColumnListProps) => {
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const { mutate: reorderColumn } = useReorderColumnMutation(boardId);

  const [editColumn, setEditColumn] = useState<Column | null>(null);
  const [deleteColumn, setDeleteColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const col = columns?.find((c) => c.id === event.active.id);
    if (col) {
      setActiveColumn(col);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveColumn(null);

    if (!over || active.id === over.id || !columns) return;

    const newIndex = columns.findIndex((col) => col.id === over.id);

    if (newIndex !== -1) {
      reorderColumn({
        columnId: String(active.id),
        newOrder: newIndex,
      });
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columns.map((c) => c.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
            {columns.map((column) => (
              <ColumnCard
                key={column.id}
                column={column}
                onEdit={setEditColumn}
                onDelete={setDeleteColumn}
              >
                {renderTasks(column.id)}
              </ColumnCard>
            ))}
          </Box>
        </SortableContext>

        <DragOverlay>
          {activeColumn ? (
            <ColumnCard
              column={activeColumn}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <EditColumnDialog
        boardId={boardId}
        column={editColumn}
        open={!!editColumn}
        onClose={() => setEditColumn(null)}
      />
      <DeleteColumnDialog
        boardId={boardId}
        column={deleteColumn}
        open={!!deleteColumn}
        onClose={() => setDeleteColumn(null)}
      />
    </>
  );
};
