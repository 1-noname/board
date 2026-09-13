import { createTheme, type ThemeOptions } from "@mui/material/styles";

const defaultFontFamily = [
  "Inter",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  "sans-serif",
].join(",");

const baseThemeOptions: ThemeOptions = {
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: defaultFontFamily,
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: defaultFontFamily,
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h2: {
      fontFamily: defaultFontFamily,
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: defaultFontFamily,
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.35,
    },
    h4: {
      fontFamily: defaultFontFamily,
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: defaultFontFamily,
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.45,
    },
    h6: {
      fontFamily: defaultFontFamily,
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: defaultFontFamily,
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: defaultFontFamily,
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
    },
    subtitle1: {
      fontFamily: defaultFontFamily,
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle2: {
      fontFamily: defaultFontFamily,
      fontSize: "0.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    caption: {
      fontFamily: defaultFontFamily,
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.33,
    },
    button: {
      fontFamily: defaultFontFamily,
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.43,
      textTransform: "none",
    },
  },
};

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: "light",
    primary: {
      main: "#4F46E5",
      light: "#818CF8",
      dark: "#3730A3",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#64748B",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#EF4444",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#F59E0B",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#3B82F6",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#22C55E",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F1F5F9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
    divider: "#E2E8F0",
  },
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: "dark",
    primary: {
      main: "#6366F1",
      light: "#A5B4FC",
      dark: "#4338CA",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#94A3B8",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#F87171",
      contrastText: "#0F172A",
    },
    warning: {
      main: "#FBBF24",
      contrastText: "#0F172A",
    },
    info: {
      main: "#60A5FA",
      contrastText: "#0F172A",
    },
    success: {
      main: "#4ADE80",
      contrastText: "#0F172A",
    },
    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },
    text: {
      primary: "#F8FAFC",
      secondary: "#94A3B8",
    },
  },
});
