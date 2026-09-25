import { useForm } from "react-hook-form";

import { useCreateColumnMutation } from "../api/useCreateColumnMutation";

import { columnFormSchema,type ColumnFormValues } from "@entities/column";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface CreateColumnDialogProps {
  boardId: string;
  open: boolean;
  onClose: () => void;
}

export const CreateColumnDialog = ({
  boardId,
  open,
  onClose,
}: CreateColumnDialogProps) => {
  const { mutate: createColumn, isPending } = useCreateColumnMutation(boardId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColumnFormValues>({
    resolver: zodResolver(columnFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: ColumnFormValues) => {
    createColumn(data.title, {
      onSuccess: () => {
        handleClose();
      },
    });
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
        Create column
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
            {isPending ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
