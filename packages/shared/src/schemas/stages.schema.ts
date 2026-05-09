import { z } from "zod";
import { CASE_STAGE_STATUS, CASE_STAGE_STATUS_VALUES } from "../types";

export const CreateCaseStageSchema = z.object({
  caseId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  assignedTo: z.string().optional(),
  priority: z.string().optional(),
  estimatedDays: z.number().optional(),
  dueDate: z.coerce.date().optional(),
  dependsOn: z.array(z.string()).optional(),
  isFinalStage: z.boolean().optional(),
});

export const UpdateCaseStageSchema = CreateCaseStageSchema.partial().omit({
  caseId: true,
});

export const UpdateCaseStageStatusSchema = z.object({
  status: z.enum(CASE_STAGE_STATUS_VALUES),

  delayReason: z.string().optional(),
});

export const AssignCaseStageSchema = z.object({
  assignedTo: z.string(),
});

export const ReorderCaseStageSchema = z.object({
  order: z.number(),
});

export type CreateCaseStageDTO = z.infer<typeof CreateCaseStageSchema>;
export type UpdateCaseStageDTO = z.infer<typeof UpdateCaseStageSchema>;
export type UpdateCaseStageStatusDTO = z.infer<typeof UpdateCaseStageStatusSchema>;
export type AssignCaseStageDTO = z.infer<typeof AssignCaseStageSchema>;
export type ReorderCaseStageDTO = z.infer<typeof ReorderCaseStageSchema>;
