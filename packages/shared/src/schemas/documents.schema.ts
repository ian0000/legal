import { z } from "zod";

export const CreateDocumentSchema = z.object({
  caseId: z.string(),

  stageId: z.string().optional(),

  name: z.string(),

  originalName: z.string(),

  mimeType: z.string(),

  size: z.number(),

  file: z.instanceof(Buffer),

  visibility: z.string().optional(),

  documentType: z.string().optional(),

  tags: z.array(z.string()).optional(),
});
export const UpdateDocumentSchema = z.object({
  name: z.string().optional(),
  visibility: z.string().optional(),
  documentType: z.string().optional(),
  tags: z.array(z.string()).optional(),
  version: z.number().optional(),
});

export type CreateDocumentDTO = z.infer<typeof CreateDocumentSchema>;
export type UpdateDocumentDTO = z.infer<typeof UpdateDocumentSchema>;
