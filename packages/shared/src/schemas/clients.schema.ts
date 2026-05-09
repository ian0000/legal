import { z } from "zod";

export const CreateClientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  cedula: z.string().min(5),
  email: z.email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  userId: z.string().optional(),
});

export const UpdateClientSchema = CreateClientSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const GetClientsQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  isActive: z.coerce.boolean().optional(),
});

export type CreateClientDTO = z.infer<typeof CreateClientSchema>;
export type UpdateClientDTO = z.infer<typeof UpdateClientSchema>;
export type GetClientsQueryDTO = z.infer<typeof GetClientsQuerySchema>;
