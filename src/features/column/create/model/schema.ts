import { z } from "zod";

export const createColumnSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
});

export type CreateColumnFormValues = z.infer<typeof createColumnSchema>;
