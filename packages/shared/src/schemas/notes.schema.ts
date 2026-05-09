import { z } from "zod";

export const CreateNoteSchema = z.object({
  caseId: z.string(),
  stageId: z.string().optional(),
  content: z.string().min(1),
  visibleToClient: z.boolean().optional(),
  attachments: z.array(z.string()).optional(),
});

export const UpdateNoteSchema = CreateNoteSchema.partial().omit({
  caseId: true,
  stageId: true,
});

export const GetNotesQuerySchema = z.object({
  caseId: z.string().optional(),
  stageId: z.string().optional(),
  visibleToClient: z.coerce.boolean().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export type CreateNoteDTO = z.infer<typeof CreateNoteSchema>;
export type UpdateNoteDTO = z.infer<typeof UpdateNoteSchema>;
export type GetNotesQueryDTO = z.infer<typeof GetNotesQuerySchema>;
