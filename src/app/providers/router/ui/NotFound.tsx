import { Box, Button, Container, Typography } from "@mui/material";
import { useAuthStore } from "@shared/store/authStore";
import { Link } from "@tanstack/react-router";

export const NotFound = () => {
  const isAuthenticated = !!useAuthStore((state) => state.accessToken);
  const targetPath = isAuthenticated ? "/boards" : "/login";
  const buttonText = isAuthenticated ? "Back to boards" : "Go to login";

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 120px)",
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          sx={(theme) => ({
            fontSize: "6rem",
            fontWeight: theme.typography.fontWeightBold,
            lineHeight: 1,
            mb: 2,
          })}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={(theme) => ({
            fontWeight: theme.typography.fontWeightBold,
            mb: 1.5,
          })}
        >
          Page not found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 420 }}
        >
          The page you are looking for doesn't exist, was removed, or is
          temporarily unavailable.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={targetPath}
          size="large"
        >
          {buttonText}
        </Button>
      </Box>
    </Container>
  );
};
