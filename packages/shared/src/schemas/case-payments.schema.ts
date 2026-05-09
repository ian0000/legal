import { z } from "zod";

const methods = ["cash", "transfer", "card", "check", "other"] as const;
const types = ["income", "expense"] as const;
const statuses = ["pending", "completed", "cancelled"] as const;

export const CreateCasePaymentSchema = z.object({
  caseId: z.string(),
  amount: z.number().min(0),
  type: z.enum(types),
  category: z.string(),
  method: z.enum(methods),
  description: z.string().optional(),
  reference: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  paymentDate: z.coerce.date().optional(),
  affectsGlobalFinance: z.boolean().optional(),
});

export const UpdateCasePaymentSchema = CreateCasePaymentSchema.partial().omit({
  caseId: true,
}).extend({
  status: z.enum(statuses).optional(),
});

export type CreateCasePaymentDTO = z.infer<typeof CreateCasePaymentSchema>;
export type UpdateCasePaymentDTO = z.infer<typeof UpdateCasePaymentSchema>;
