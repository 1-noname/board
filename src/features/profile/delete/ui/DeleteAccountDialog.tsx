import { useDeleteAccountMutation } from "../api/useDeleteAccountMutation";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteAccountDialogProps {
  open: boolean;
  onClose: () => void;
}

export const DeleteAccountDialog = ({
  open,
  onClose,
}: DeleteAccountDialogProps) => {
  const { mutate, isPending } = useDeleteAccountMutation();

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleDeleteAccount = () => {
    mutate();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete account</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Are you sure you want to delete your account? This action is
          irreversible and all your boards, columns, and tasks will be
          permanently removed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isPending} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleDeleteAccount}
          variant="contained"
          color="error"
          loading={isPending}
        >
          Delete account
        </Button>
      </DialogActions>
    </Dialog>
  );
};
