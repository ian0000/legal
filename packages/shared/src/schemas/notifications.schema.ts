import { z } from "zod";
import { NOTIFICATION_PRIORITY } from "../types";

export const CreateNotificationSchema = z.object({
  userId: z.string(),
  title: z.string(),
  message: z.string(),
  type: z.string(),
  priority: z.enum(Object.values(NOTIFICATION_PRIORITY) as [string, ...string[]]).optional(),
  actionUrl: z.string().optional(),
  entityType: z.string().optional(),
  entityId: z.string().optional(),
  relatedCaseId: z.string().optional(),
  relatedStageId: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  expiresAt: z.coerce.date().optional(),
});

export const UpdateNotificationSchema = CreateNotificationSchema.partial().extend({
  isRead: z.boolean().optional(),
  readAt: z.coerce.date().optional(),
});

export type CreateNotificationDTO = z.infer<typeof CreateNotificationSchema>;
export type UpdateNotificationDTO = z.infer<typeof UpdateNotificationSchema>;
