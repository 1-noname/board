import { type ReactNode, useEffect, useState } from "react";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  type DropAnimation,
} from "@dnd-kit/core";
import {
  arrayMove,
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
  const [localColumns, setLocalColumns] = useState<Column[]>(columns);

  useEffect(() => {
    setLocalColumns(columns);
  }, [columns]);

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
    const col = localColumns.find((c) => c.id === event.active.id);
    if (col) {
      setActiveColumn(col);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveColumn(null);

    if (!over || active.id === over.id) return;

    const oldIndex = localColumns.findIndex((col) => col.id === active.id);
    const newIndex = localColumns.findIndex((col) => col.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setLocalColumns((items) => arrayMove(items, oldIndex, newIndex));

      reorderColumn({
        columnId: String(active.id),
        newOrder: newIndex,
      });
    }
  };

  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.4",
        },
      },
    }),
    duration: 250,
    easing: "ease-out",
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localColumns.map((c) => c.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
            {localColumns.map((column) => (
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

        <DragOverlay dropAnimation={dropAnimationConfig}>
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
        open={Boolean(editColumn)}
        onClose={() => setEditColumn(null)}
      />
      <DeleteColumnDialog
        boardId={boardId}
        column={deleteColumn}
        open={Boolean(deleteColumn)}
        onClose={() => setDeleteColumn(null)}
      />
    </>
  );
};
