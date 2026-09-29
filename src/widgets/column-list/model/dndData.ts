import type { Active } from "@dnd-kit/core";
import type { Column } from "@entities/column";
import type { Task } from "@entities/task";

export type ColumnDragData = { type: "Column"; column: Column };
export type TaskDragData = { type: "Task"; task: Task; columnId: string };
export type DragData = ColumnDragData | TaskDragData;

type WithData = Pick<Active, "data">;

export const getDragData = (item: WithData | null): DragData | null => {
  const data = item?.data.current;
  if (data?.type === "Column" || data?.type === "Task") {
    return data as DragData;
  }
  return null;
};
