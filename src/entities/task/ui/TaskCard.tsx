import type { Task } from "../model/schema";

import { Box, Chip, Paper, Typography } from "@mui/material";

interface TaskCardProps {
  task: Task;
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

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
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
  );
};
