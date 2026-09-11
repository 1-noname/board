import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().pipe(z.email()),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof userSchema>;
