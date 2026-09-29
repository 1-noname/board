import { useState } from "react";

import type { Column } from "@entities/column";

export const useColumnDialogs = () => {
  const [editColumn, setEditColumn] = useState<Column | null>(null);
  const [deleteColumn, setDeleteColumn] = useState<Column | null>(null);

  return { editColumn, setEditColumn, deleteColumn, setDeleteColumn };
};
