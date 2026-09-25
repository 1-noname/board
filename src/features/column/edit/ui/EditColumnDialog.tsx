import { useForm } from "react-hook-form";

import { useEditColumnMutation } from "../api/useEditColumnMutation";

import type { Column } from "@entities/column";
import { columnFormSchema, type ColumnFormValues } from "@entities/column";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface EditColumnDialogProps {
  boardId: string;
  column: Column | null;
  open: boolean;
  onClose: () => void;
}

export const EditColumnDialog = ({
  boardId,
  column,
  open,
  onClose,
}: EditColumnDialogProps) => {
  const { mutate: editColumn, isPending } = useEditColumnMutation(boardId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColumnFormValues>({
    resolver: zodResolver(columnFormSchema),
    values: {
      title: column?.title ?? "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: ColumnFormValues) => {
    if (!column) return;

    editColumn(
      { columnId: column.id, title: data.title },
      {
        onSuccess: handleClose,
      },
    );
  };

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={(theme) => ({
          fontWeight: theme.typography.fontWeightBold,
        })}
      >
        Edit column
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <TextField
            {...register("title")}
            label="Column title"
            fullWidth
            autoFocus
            margin="dense"
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            disabled={isPending}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isPending} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
