import { Box } from "@mui/material";
import { ToastContainer } from "@shared/ui/toast";
import { Outlet } from "@tanstack/react-router";

export const RootLayout = () => {
  return (
    <Box
      sx={(theme) => ({
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      })}
    >
      <Outlet />
      <ToastContainer />
    </Box>
  );
};
