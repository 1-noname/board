import { z } from "zod";

export const createBoardSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .trim()
    .max(300, "Description must be less than 300 characters")
    .optional()
    .or(z.literal("")),
});

export type CreateBoardFormData = z.infer<typeof createBoardSchema>;
