import { Alert, Snackbar, Stack } from "@mui/material";
import { useToastStore } from "@shared/store/useToastStore";

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <Stack
      spacing={1}
      sx={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: (theme) => theme.zIndex.snackbar,
        maxWidth: 400,
        width: "calc(100% - 32px)",
      }}
    >
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open
          autoHideDuration={3000}
          onClose={() => removeToast(toast.id)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ position: "static" }}
        >
          <Alert
            onClose={() => removeToast(toast.id)}
            severity={toast.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
};
