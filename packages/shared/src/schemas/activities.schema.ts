import { z } from "zod";

import { ACTIVITY_ACTION_VALUES } from "../types";

export const CreateActivitySchema = z.object({
  userId: z.string(),

  caseId: z.string().optional(),

  stageId: z.string().optional(),

  action: z.enum(ACTIVITY_ACTION_VALUES),

  description: z.string().optional(),

  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateActivityDTO = z.infer<typeof CreateActivitySchema>;
