import { useState } from "react";
import { useForm } from "react-hook-form";

import { useLoginMutation } from "../api/useLoginMutation";
import { type LoginFormData, loginSchema } from "../model/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate, isPending } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit((data) => mutate(data))}
      noValidate
      spacing={2}
    >
      <TextField
        {...register("email")}
        label="Email"
        type="email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        disabled={isPending}
        autoComplete="email"
      />

      <TextField
        {...register("password")}
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        disabled={isPending}
        autoComplete="current-password"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isPending}
        sx={{ mt: 1 }}
      >
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </Stack>
  );
};
