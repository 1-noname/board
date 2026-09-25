import { useDeleteColumnMutation } from "../api/useDeleteColumnMutation";

import type { Column } from "@entities/column";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteColumnDialogProps {
  boardId: string;
  column: Column | null;
  open: boolean;
  onClose: () => void;
}

export const DeleteColumnDialog = ({
  boardId,
  column,
  open,
  onClose,
}: DeleteColumnDialogProps) => {
  const { mutate: deleteColumn, isPending } = useDeleteColumnMutation(boardId);

  const handleDelete = () => {
    if (!column) return;

    deleteColumn(column.id, {
      onSuccess: onClose,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={(theme) => ({
          fontWeight: theme.typography.fontWeightBold,
        })}
      >
        Delete column
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{column?.title}</strong>? All
          tasks in this column will also be deleted. This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isPending} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
