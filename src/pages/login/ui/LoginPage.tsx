import { LoginForm } from "@features/auth-login";
import { Box } from "@mui/material";
import { AuthCard } from "@widgets/auth-card";

export const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <AuthCard
        title="Login"
        subtitle="Sign in to manage your boards"
        bottomText="Don't have an account?"
        bottomActionText="Register"
        bottomActionTo="/register"
      >
        <LoginForm />
      </AuthCard>
    </Box>
  );
};
