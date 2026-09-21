import { useForm } from "react-hook-form";

import { useCreateBoardMutation } from "../api/useCreateBoardMutation";
import { type CreateBoardFormData, createBoardSchema } from "../model/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface CreateBoardDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateBoardDialog = ({
  open,
  onClose,
}: CreateBoardDialogProps) => {
  const { mutate, isPending } = useCreateBoardMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBoardFormData>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleClose = () => {
    if (isPending) return;
    reset();
    onClose();
  };

  const onSubmit = (data: CreateBoardFormData) => {
    mutate(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create board</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent dividers>
          <TextField
            {...register("title")}
            label="Title"
            fullWidth
            required
            autoFocus
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
            Create board
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
