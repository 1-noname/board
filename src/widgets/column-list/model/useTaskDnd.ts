import { useRef, useState } from "react";

import { getDragData, type TaskDragData } from "./dndData";

import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { type Task, taskKeys } from "@entities/task";
import { useReorderTaskMutation } from "@features/task/reorder";
import { type QueryKey, useQueryClient } from "@tanstack/react-query";

type CacheSnapshot = [QueryKey, Task[] | undefined][];

interface TaskDragSession {
  originalColumnId: string;
  currentColumnId: string;
  originalIndex: number;
  snapshot: CacheSnapshot;
}

export const useTaskDnd = (boardId: string) => {
  const queryClient = useQueryClient();
  const { mutate: reorderTask } = useReorderTaskMutation(boardId);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sessionRef = useRef<TaskDragSession | null>(null);

  const getTasks = (columnId: string) =>
    queryClient.getQueryData<Task[]>(taskKeys.list(boardId, columnId));

  const updateTasks = (columnId: string, updater: (prev: Task[]) => Task[]) =>
    queryClient.setQueryData<Task[]>(
      taskKeys.list(boardId, columnId),
      (prev) => prev && updater(prev),
    );

  const rollback = (session: TaskDragSession) => {
    session.snapshot.forEach(([key, data]) => {
      queryClient.setQueryData(key, data);
    });
  };

  const resetDrag = () => {
    sessionRef.current = null;
    setActiveTask(null);
  };

  const onStart = ({ task, columnId }: TaskDragData) => {
    void queryClient.cancelQueries({ queryKey: taskKeys.all(boardId) });

    sessionRef.current = {
      originalColumnId: columnId,
      currentColumnId: columnId,
      originalIndex:
        getTasks(columnId)?.findIndex((t) => t.id === task.id) ?? -1,
      snapshot: queryClient.getQueriesData<Task[]>({
        queryKey: taskKeys.all(boardId),
      }),
    };
    setActiveTask(task);
  };

  const onOver = ({ active, over }: DragOverEvent) => {
    const session = sessionRef.current;
    const activeData = getDragData(active);
    const overData = getDragData(over);

    if (!session || !over || active.id === over.id) return;
    if (activeData?.type !== "Task" || !overData) return;

    const fromColumnId = session.currentColumnId;
    const toColumnId =
      overData.type === "Task" ? overData.columnId : overData.column.id;
    if (fromColumnId === toColumnId) return;

    const targetTasks = getTasks(toColumnId);
    if (!targetTasks) return;

    const overIndex =
      overData.type === "Task"
        ? targetTasks.findIndex((t) => t.id === over.id)
        : -1;

    const translated = active.rect.current.translated;
    const isBelowOver =
      !!translated && translated.top > over.rect.top + over.rect.height / 2;

    const insertIndex =
      overIndex >= 0 ? overIndex + (isBelowOver ? 1 : 0) : targetTasks.length;

    updateTasks(fromColumnId, (prev) => prev.filter((t) => t.id !== active.id));
    updateTasks(toColumnId, (prev) =>
      prev.some((t) => t.id === active.id)
        ? prev
        : [
            ...prev.slice(0, insertIndex),
            { ...activeData.task, columnId: toColumnId },
            ...prev.slice(insertIndex),
          ],
    );

    session.currentColumnId = toColumnId;
  };

  const onEnd = ({ active, over }: DragEndEvent) => {
    const session = sessionRef.current;

    if (!session) return resetDrag();

    if (!over) {
      rollback(session);
      return resetDrag();
    }

    const { originalColumnId, currentColumnId, originalIndex } = session;
    const tasks = getTasks(currentColumnId) ?? [];

    const overData = getDragData(over);
    const oldIndex = tasks.findIndex((t) => t.id === active.id);

    let newIndex = oldIndex;
    if (overData?.type === "Task") {
      newIndex = tasks.findIndex((t) => t.id === over.id);
    } else if (overData?.type === "Column") {
      newIndex = tasks.length - 1;
    }

    let finalOrder = oldIndex;
    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      updateTasks(currentColumnId, (prev) =>
        arrayMove(prev, oldIndex, newIndex),
      );
      finalOrder = newIndex;
    }

    const isUnchanged =
      originalColumnId === currentColumnId && originalIndex === finalOrder;

    if (finalOrder !== -1 && !isUnchanged) {
      reorderTask({
        sourceColumnId: originalColumnId,
        taskId: String(active.id),
        payload: { newColumnId: currentColumnId, newOrder: finalOrder },
      });
    }

    resetDrag();
  };

  const onCancel = () => {
    if (sessionRef.current) rollback(sessionRef.current);
    resetDrag();
  };

  return { activeTask, onStart, onOver, onEnd, onCancel };
};
