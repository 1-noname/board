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

export type Column = z.infer<typeof columnSchema>;
