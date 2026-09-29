import { useMemo, useState } from "react";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type Task, TaskCard, useTasksQuery } from "@entities/task";
import { CreateTaskDialog } from "@features/task/create";
import { DeleteTaskDialog } from "@features/task/delete";
import { EditTaskDialog } from "@features/task/update";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import { PageLoader } from "@shared/ui/page-loader";

interface ColumnTaskListProps {
  boardId: string;
  columnId: string;
}

export const ColumnTaskList = ({ boardId, columnId }: ColumnTaskListProps) => {
  const { data: tasks, isLoading, isError } = useTasksQuery(boardId, columnId);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const taskIds = useMemo(() => {
    return tasks?.map((t) => t.id) || [];
  }, [tasks]);

  if (isLoading) return <PageLoader />;

  if (isError) {
    return (
      <Typography variant="caption" color="error">
        Failed to load tasks
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {!tasks || tasks.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
            No tasks yet
          </Typography>
        ) : (
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                columnId={columnId}
                onEdit={setEditTask}
                onDelete={setDeleteTask}
              />
            ))}
          </SortableContext>
        )}
      </Box>

      <Button
        startIcon={<AddIcon />}
        onClick={() => setIsCreateOpen(true)}
        sx={{ mt: 1 }}
      >
        Add task
      </Button>

      <CreateTaskDialog
        boardId={boardId}
        columnId={columnId}
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
      <EditTaskDialog
        boardId={boardId}
        columnId={columnId}
        task={editTask}
        open={!!editTask}
        onClose={() => setEditTask(null)}
      />
      <DeleteTaskDialog
        boardId={boardId}
        columnId={columnId}
        task={deleteTask}
        open={!!deleteTask}
        onClose={() => setDeleteTask(null)}
      />
    </>
  );
};
