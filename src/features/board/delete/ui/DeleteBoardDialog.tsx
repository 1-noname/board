import { useDeleteBoardMutation } from "../api/useDeleteBoardMutation";

import type { Board } from "@entities/board";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteBoardDialogProps {
  board: Board | null;
  open: boolean;
  onClose: () => void;
  onSuccessDelete?: () => void;
}

export const DeleteBoardDialog = ({
  board,
  open,
  onClose,
  onSuccessDelete,
}: DeleteBoardDialogProps) => {
  const { mutate, isPending } = useDeleteBoardMutation();

  const handleUserClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleDelete = () => {
    if (!board) return;

    mutate(board.id, {
      onSuccess: () => {
        onClose();
        onSuccessDelete?.();
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleUserClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete board</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Are you sure you want to delete <strong>{board?.title}</strong>? This
          action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUserClose} disabled={isPending} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          loading={isPending}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
