import { z } from "zod";

export const taskPrioritySchema = z.enum([
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
  "CRITICAL",
]);

export type TaskPriority = z.infer<typeof taskPrioritySchema>;

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  order: z.number(),
  priority: taskPrioritySchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const tasksResponseSchema = z.object({
  tasks: z.array(taskSchema),
});

export const TaskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: taskPrioritySchema,
});

export type TaskFormPayload = z.infer<typeof TaskFormSchema>;
