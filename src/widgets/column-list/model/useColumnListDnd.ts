import { collisionDetection } from "./collisionDetection";
import { getDragData } from "./dndData";
import { useColumnDnd } from "./useColumnDnd";
import { useTaskDnd } from "./useTaskDnd";

import {
  defaultDropAnimationSideEffects,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { Column } from "@entities/column";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: "0.4" } },
  }),
  duration: 250,
  easing: "ease-out",
};

interface UseColumnListDnDOptions {
  boardId: string;
  columns: Column[];
}

export const useColumnListDnD = ({
  boardId,
  columns,
}: UseColumnListDnDOptions) => {
  const columnDnD = useColumnDnd(boardId, columns);
  const taskDnD = useTaskDnd(boardId);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    const data = getDragData(active);
    if (data?.type === "Column") columnDnD.onStart(data.column);
    if (data?.type === "Task") taskDnD.onStart(data);
  };

  const handleDragOver = (event: DragOverEvent) => {
    taskDnD.onOver(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const type = getDragData(event.active)?.type;
    if (type === "Column") columnDnD.onEnd(event);
    if (type === "Task") taskDnD.onEnd(event);
  };

  const handleDragCancel = () => {
    columnDnD.onCancel();
    taskDnD.onCancel();
  };

  return {
    localColumns: columnDnD.localColumns,
    activeColumn: columnDnD.activeColumn,
    activeTask: taskDnD.activeTask,
    sensors,
    collisionDetection,
    dropAnimation,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
};
