import { LoginForm } from "@features/auth-login";
import { Container } from "@mui/material";
import { AuthCard } from "@shared/ui";

export const LoginPage = () => {
  return (
    <Container
      component="main"
      maxWidth={false}
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
    </Container>
  );
};
