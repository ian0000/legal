import { z } from "zod";

const methods = ["cash", "transfer", "card", "check", "other"] as const;
const types = ["income", "expense"] as const;
const statuses = ["pending", "completed", "cancelled"] as const;

export const CreateFinanceTransactionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  amount: z.number(),
  type: z.enum(types),
  category: z.string(),
  method: z.enum(methods).optional(),
  reference: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  transactionDate: z.coerce.date().optional(),
  relatedCaseId: z.string().optional(),
});

export const UpdateFinanceTransactionSchema = CreateFinanceTransactionSchema.partial().extend({
  status: z.enum(statuses).optional(),
});

export type CreateFinanceTransactionDTO = z.infer<typeof CreateFinanceTransactionSchema>;
export type UpdateFinanceTransactionDTO = z.infer<typeof UpdateFinanceTransactionSchema>;
