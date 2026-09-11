import type { PropsWithChildren } from "react";

import { darkTheme, lightTheme } from "../model/theme";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeStore } from "@shared/store/useThemeStore";

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const mode = useThemeStore((state) => state.mode);
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
