import { useDeleteTaskMutation } from "../api/useDeleteTaskMutation";

import type { Task } from "@entities/task";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteTaskDialogProps {
  boardId: string;
  columnId: string;
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

export const DeleteTaskDialog = ({
  boardId,
  columnId,
  task,
  open,
  onClose,
}: DeleteTaskDialogProps) => {
  const { mutate: deleteTask, isPending } = useDeleteTaskMutation(
    boardId,
    columnId,
  );

  const handleDelete = () => {
    if (!task) return;

    deleteTask(task.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete task <strong>"{task?.title}"</strong>?
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={isPending}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
