import { z } from "zod";
import { CASE_STATUS, CASE_STATUS_VALUES } from "../types";

export const CreateCaseSchema = z.object({
  code: z.string().min(1),
  title: z.string().min(3),
  description: z.string().optional(),
  type: z.string().optional(),
  clientId: z.string(),
  principalLawyerId: z.string(),
  assignedUsers: z.array(z.string()).optional(),
  priority: z.string().optional(),
  startDate: z.coerce.date().optional(),
  estimatedEndDate: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
  createdBy: z.string(),
});

export const UpdateCaseSchema = CreateCaseSchema.partial()
  .omit({
    code: true,
    clientId: true,
    createdBy: true,
  })
  .extend({
    status: z.enum(CASE_STATUS_VALUES).optional(),

    completedAt: z.coerce.date().optional(),

    currentStageId: z.string().optional(),
  });

export const GetCasesSchema = z.object({
  status: z.enum(Object.values(CASE_STATUS) as [string, ...string[]]).optional(),
  clientId: z.string().optional(),
  principalLawyerId: z.string().optional(),
  priority: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export type CreateCaseDTO = z.infer<typeof CreateCaseSchema>;
export type UpdateCaseDTO = z.infer<typeof UpdateCaseSchema>;
export type GetCasesDTO = z.infer<typeof GetCasesSchema>;
