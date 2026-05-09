import { z } from "zod";
import { USER_ROLES } from "../types/roles";

export const CreateUserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  role: z.enum(Object.values(USER_ROLES) as [string, ...string[]]).optional(),
});

export const UpdateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  cedula: z.string().optional(),
});

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
export type UpdatePasswordDTO = z.infer<typeof UpdatePasswordSchema>;
