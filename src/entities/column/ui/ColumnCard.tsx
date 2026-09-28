import { type ReactNode } from "react";

import type { Column } from "../model/schema";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteIcon from "@mui/icons-material/Delete";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";

interface ColumnCardProps {
  column: Column;
  onEdit: (column: Column) => void;
  onDelete: (column: Column) => void;
  onAddTask?: (columnId: string) => void;
  children?: ReactNode;
}

export const ColumnCard = ({
  column,
  onEdit,
  onDelete,
  onAddTask,
  children,
}: ColumnCardProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleEditClick = () => {
    onEdit(column);
  };

  const handleDeleteClick = () => {
    onDelete(column);
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      elevation={1}
      sx={{
        width: 300,
        minWidth: 300,
        maxHeight: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        bgcolor: "action.hover",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <IconButton
          size="small"
          {...attributes}
          {...listeners}
          sx={{ cursor: isDragging ? "grabbing" : "grab" }}
          aria-label="drag column"
        >
          <DragHandleIcon />
        </IconButton>
        <Typography
          variant="subtitle1"
          sx={(theme) => ({
            fontWeight: theme.typography.fontWeightBold,
          })}
        >
          {column.title}
        </Typography>

        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            aria-label="edit column"
            size="small"
            onClick={handleEditClick}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            aria-label="delete column"
            size="small"
            color="error"
            onClick={handleDeleteClick}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", minHeight: 100, mb: 1 }}>
        {children}
      </Box>

      {onAddTask && (
        <Button
          size="small"
          onClick={() => onAddTask(column.id)}
          sx={{ justifyContent: "flex-start", mt: "auto" }}
        >
          Add task
        </Button>
      )}
    </Paper>
  );
};
