import { type ReactNode, useEffect, useRef, useState } from "react";

import {
  closestCorners,
  type CollisionDetection,
  defaultDropAnimationSideEffects,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  type DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { type Column, ColumnCard } from "@entities/column";
import { type Task, TaskCard } from "@entities/task";
import { DeleteColumnDialog } from "@features/column/delete";
import { EditColumnDialog } from "@features/column/edit";
import { useReorderColumnMutation } from "@features/column/reorder";
import { useReorderTaskMutation } from "@features/task/reorder/api/useReorderTaskMutation";
import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const [localColumns, setLocalColumns] = useState<Column[]>(columns);

  useEffect(() => {
    setLocalColumns(columns);
  }, [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const { mutate: reorderColumn } = useReorderColumnMutation(boardId);
  const { mutate: reorderTask } = useReorderTaskMutation(boardId);

  const [editColumn, setEditColumn] = useState<Column | null>(null);
  const [deleteColumn, setDeleteColumn] = useState<Column | null>(null);

  const originalColumnIdRef = useRef<string | null>(null);
  const currentColumnIdRef = useRef<string | null>(null);
  const originalIndexRef = useRef<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const customCollisionDetection: CollisionDetection = (args) => {
    const activeType = args.active.data.current?.type;

    if (activeType === "Column") {
      const columnContainers = args.droppableContainers.filter(
        (c) => c.data.current?.type === "Column",
      );

      return closestCorners({
        ...args,
        droppableContainers: columnContainers,
      });
    }

    return closestCorners(args);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;

    if (data?.type === "Column") {
      setActiveColumn(data.column);
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      originalColumnIdRef.current = data.columnId;
      currentColumnIdRef.current = data.columnId;

      const tasks = queryClient.getQueryData<Task[]>([
        "tasks",
        boardId,
        data.columnId,
      ]);
      originalIndexRef.current = tasks
        ? tasks.findIndex((t) => t.id === active.id)
        : -1;
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const activeData = active.data.current;
    if (activeData?.type !== "Task") return;

    const activeColumnId = currentColumnIdRef.current;
    const overData = over.data.current;

    let overColumnId: string | null = null;
    if (overData?.type === "Task") {
      overColumnId = overData.columnId;
    } else if (overData?.type === "Column") {
      overColumnId = overData.column.id;
    }

    if (!activeColumnId || !overColumnId || activeColumnId === overColumnId)
      return;

    queryClient.setQueryData<Task[]>(
      ["tasks", boardId, activeColumnId],
      (prev) => {
        if (!prev) return [];
        return prev.filter((t) => t.id !== active.id);
      },
    );

    const task = activeData.task as Task;

    queryClient.setQueryData<Task[]>(
      ["tasks", boardId, overColumnId],
      (prev) => {
        if (!prev || prev.some((t) => t.id === active.id)) return prev;

        const overIndex =
          overData?.type === "Task"
            ? prev.findIndex((t) => t.id === over.id)
            : -1;

        const isBelowOver =
          !!active.rect.current.translated &&
          active.rect.current.translated.top >
            over.rect.top + over.rect.height / 2;

        const insertIndex =
          overIndex >= 0 ? overIndex + (isBelowOver ? 1 : 0) : prev.length;

        const next = [...prev];
        next.splice(insertIndex, 0, task);
        return next;
      },
    );

    currentColumnIdRef.current = overColumnId;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveColumn(null);
    setActiveTask(null);

    if (!over) {
      if (active.data.current?.type === "Task") {
        const originalCol = originalColumnIdRef.current;
        const currentCol = currentColumnIdRef.current;

        if (originalCol && currentCol && originalCol !== currentCol) {
          queryClient.invalidateQueries({ queryKey: ["tasks", boardId] });
        }
      }

      originalColumnIdRef.current = null;
      currentColumnIdRef.current = null;
      originalIndexRef.current = null;
      return;
    }

    if (active.data.current?.type === "Column" && active.id !== over.id) {
      const oldIndex = localColumns.findIndex((col) => col.id === active.id);
      const newIndex = localColumns.findIndex((col) => col.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setLocalColumns((items) => arrayMove(items, oldIndex, newIndex));
        reorderColumn({ columnId: String(active.id), newOrder: newIndex });
      }
      return;
    }

    if (active.data.current?.type === "Task") {
      const originalColumnId = originalColumnIdRef.current;
      const currentColumnId = currentColumnIdRef.current;

      if (!currentColumnId || !originalColumnId) return;

      queryClient.setQueryData<Task[]>(
        ["tasks", boardId, currentColumnId],
        (prev) => {
          if (!prev) return prev;
          const oldIndex = prev.findIndex((t) => t.id === active.id);
          let newIndex = prev.findIndex((t) => t.id === over.id);

          if (newIndex === -1 && over.data.current?.type === "Column") {
            newIndex = prev.length - 1;
          }

          if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            return arrayMove(prev, oldIndex, newIndex);
          }
          return prev;
        },
      );

      const finalTasks =
        queryClient.getQueryData<Task[]>(["tasks", boardId, currentColumnId]) ||
        [];
      const finalOrder = finalTasks.findIndex((t) => t.id === active.id);

      const isSameColumn = originalColumnId === currentColumnId;
      const isSameIndex = originalIndexRef.current === finalOrder;

      if (finalOrder !== -1 && !(isSameColumn && isSameIndex)) {
        reorderTask({
          sourceColumnId: originalColumnId,
          taskId: String(active.id),
          payload: {
            newColumnId: currentColumnId,
            newOrder: finalOrder,
          },
        });
      }

      originalColumnIdRef.current = null;
      currentColumnIdRef.current = null;
      originalIndexRef.current = null;
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
        collisionDetection={customCollisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
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

        <DragOverlay dropAnimation={dropAnimationConfig}>
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
              columnId={""}
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
