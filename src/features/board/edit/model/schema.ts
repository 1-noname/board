import { z } from "zod";

export const editBoardSchema = z.object({
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

export type EditBoardFormData = z.infer<typeof editBoardSchema>;
