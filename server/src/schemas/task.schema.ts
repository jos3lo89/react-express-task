import { z } from "zod";

export const createTaskSchemaZod = z.object({
  title: z.string({ required_error: "Titulo requerido" }),
  description: z.string({ required_error: "Descripción requerido" }),
});

export type TypeCreateTask = z.infer<typeof createTaskSchemaZod>;

export const updateTaskSchemaZod = z.object({
  title: z.string({ required_error: "Titulo requerido" }),
  description: z.string().optional(),
});

export type TypeUpdateTask = z.infer<typeof updateTaskSchemaZod>;
