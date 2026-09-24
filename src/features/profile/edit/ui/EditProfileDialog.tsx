import { useId } from "react";
import { useForm, useWatch } from "react-hook-form";

import { useUpdateProfileMutation } from "../api/useUpdateProfileMutation";
import {
  type UpdateProfileFormData,
  updateProfileSchema,
} from "../model/schema";

import type { User } from "@entities/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface EditProfileDialogProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

export const EditProfileDialog = ({
  user,
  open,
  onClose,
}: EditProfileDialogProps) => {
  const formId = useId();
  const { mutate, isPending } = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      name: user?.name ?? "",
    },
  });

  const currentName = useWatch({
    control,
    name: "name",
    defaultValue: user?.name ?? "",
  });

  const isUnchanged = currentName.trim() === user?.name;

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const onSubmit = (data: UpdateProfileFormData) => {
    mutate(data, {
      onSuccess: handleClose,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit name</DialogTitle>
      <DialogContent dividers>
        <form id={formId} onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("name")}
            label="Name"
            fullWidth
            required
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isPending} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          form={formId}
          variant="contained"
          loading={isPending}
          disabled={isUnchanged}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
