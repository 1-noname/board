import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#4F46E5" },
    secondary: { main: "#64748B" },
    error: { main: "#EF4444" },
    info: { main: "#3B82F6" },
    success: { main: "#22C55E" },
    warning: { main: "#F59E0B" },
    background: {
      default: "#F1F5F9",
      paper: "#FFFFFF",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366F1" },
    secondary: { main: "#94A3B8" },
    error: { main: "#F87171" },
    info: { main: "#60A5FA" },
    success: { main: "#4ADE80" },
    warning: { main: "#FBBF24" },
    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },
  },
});
