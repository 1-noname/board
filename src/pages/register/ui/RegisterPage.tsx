import { RegisterForm } from "@features/auth";
import { Container } from "@mui/material";
import { AuthCard } from "@shared/ui/auth";

export const RegisterPage = () => {
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <AuthCard
        title="Register"
        subtitle="Create an account to start managing your boards"
        bottomText="Already have an account?"
        bottomActionText="Login"
        bottomActionTo="/login"
      >
        <RegisterForm />
      </AuthCard>
    </Container>
  );
};
