import { useForm } from "react-hook-form";

import { useEditBoardMutation } from "../api/useEditBoardMutation";
import { type EditBoardFormData, editBoardSchema } from "../model/schema";

import type { Board } from "@entities/board";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface EditBoardDialogProps {
  board: Board | null;
  open: boolean;
  onClose: () => void;
}

export const EditBoardDialog = ({
  board,
  open,
  onClose,
}: EditBoardDialogProps) => {
  const { mutate, isPending } = useEditBoardMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBoardFormData>({
    resolver: zodResolver(editBoardSchema),
    values: {
      title: board?.title ?? "",
      description: board?.description ?? "",
    },
  });

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const onSubmit = (data: EditBoardFormData) => {
    if (!board) return;

    mutate(
      { id: board.id, dto: data },
      {
        onSuccess: onClose,
      },
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit board</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent dividers>
          <TextField
            {...register("title")}
            label="Title"
            fullWidth
            required
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
            slotProps={{ htmlInput: { maxLength: 100 } }}
          />
          <TextField
            {...register("description")}
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
            slotProps={{ htmlInput: { maxLength: 300 } }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={isPending} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" loading={isPending}>
            Save changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
