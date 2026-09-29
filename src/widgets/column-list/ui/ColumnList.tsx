import type { ReactNode } from "react";

import { useColumnDialogs } from "../model/useColumnDialogs";
import { useColumnListDnD } from "../model/useColumnListDnd";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { type Column, ColumnCard } from "@entities/column";
import { TaskCard } from "@entities/task";
import { DeleteColumnDialog } from "@features/column/delete";
import { EditColumnDialog } from "@features/column/edit";
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
  const { editColumn, setEditColumn, deleteColumn, setDeleteColumn } =
    useColumnDialogs();

  const {
    localColumns,
    activeColumn,
    activeTask,
    sensors,
    collisionDetection,
    dropAnimation,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useColumnListDnD({ boardId, columns });

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={localColumns.map((c) => c.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              alignItems: "flex-start",
              p: 1,
            }}
          >
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

        <DragOverlay dropAnimation={dropAnimation}>
          {activeColumn ? (
            <ColumnCard
              column={activeColumn}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ) : null}
          {activeTask ? (
            <TaskCard
              task={activeTask}
              columnId=""
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
