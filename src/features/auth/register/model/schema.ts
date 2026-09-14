import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email("Invalid email address").trim().min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    passwordRepeat: z
      .string()
      .min(1, "Confirm password is required")
      .min(6, "Password repeat must be at least 6 characters"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords don't match",
    path: ["passwordRepeat"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
