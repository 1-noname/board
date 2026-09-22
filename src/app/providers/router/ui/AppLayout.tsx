import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { Header } from "@widgets/header";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </>
  );
};
