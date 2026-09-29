import { getDragData } from "./dndData";

import {
  closestCorners,
  type CollisionDetection,
  pointerWithin,
} from "@dnd-kit/core";

export const collisionDetection: CollisionDetection = (args) => {
  if (getDragData(args.active)?.type === "Column") {
    return closestCorners({
      ...args,
      droppableContainers: args.droppableContainers.filter(
        (container) => getDragData(container)?.type === "Column",
      ),
    });
  }

  const pointerCollisions = pointerWithin(args);
  return pointerCollisions.length > 0
    ? pointerCollisions
    : closestCorners(args);
};
