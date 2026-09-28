import type { Task } from "../model/schema";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";

interface TaskCardProps {
  task: Task;
  columnId: string;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const priorityColors: Record<
  Task["priority"],
  "default" | "info" | "warning" | "error"
> = {
  LOW: "default",
  MEDIUM: "info",
  HIGH: "warning",
  URGENT: "error",
  CRITICAL: "error",
};

export const TaskCard = ({
  task,
  columnId,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
      columnId,
      originalColumnId: columnId,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ touchAction: "none" }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 1.5,
          mb: 1.5,
          bgcolor: "background.paper",
          borderRadius: 1.5,
          "&:last-child": { mb: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            mb: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", wordBreak: "break-word" }}
          >
            {task.title}
          </Typography>

          <Box sx={{ display: "flex", gap: 0.5, opacity: 0.8 }}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task);
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
        {task.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {task.description}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Chip
            label={task.priority}
            size="small"
            color={priorityColors[task.priority]}
            variant="outlined"
            sx={{ fontSize: "0.7rem", height: 20 }}
          />
        </Box>
      </Paper>
    </Box>
  );
};
