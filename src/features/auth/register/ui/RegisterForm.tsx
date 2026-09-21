import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRegisterMutation } from "../api/useRegisterMutation";
import { type RegisterFormData, registerSchema } from "../model/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate, isPending } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => mutate(data))}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
    >
      <TextField
        {...register("name")}
        label="Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        {...register("email")}
        label="Email"
        type="email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        {...register("password")}
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        autoComplete="new-password"
        error={!!errors.password}
        helperText={errors.password?.message}
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

      <TextField
        {...register("passwordRepeat")}
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        autoComplete="new-password"
        error={!!errors.passwordRepeat}
        helperText={errors.passwordRepeat?.message}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={isPending}
        sx={{ mt: 1 }}
      >
        Register
      </Button>
    </Box>
  );
};
