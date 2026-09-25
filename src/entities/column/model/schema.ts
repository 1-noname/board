import { z } from "zod";

export const columnSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number(),
  boardId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const columnsResponseSchema = z.object({
  columns: z.array(columnSchema),
});

export const columnFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
});

export type Column = z.infer<typeof columnSchema>;
export type ColumnFormValues = z.infer<typeof columnFormSchema>;
