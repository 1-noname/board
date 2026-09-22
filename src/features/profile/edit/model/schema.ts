import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
