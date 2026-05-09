import { Router } from "express";

import * as DocumentsController from "./documents.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.use(authenticate);

// =====================================
// DOCUMENTS
// =====================================

router.post("/", DocumentsController.createDocument);

router.get("/case/:caseId", DocumentsController.getCaseDocuments);

router.get("/:documentId", DocumentsController.getDocumentById);

router.put("/:documentId", DocumentsController.updateDocument);

router.delete("/:documentId", DocumentsController.deleteDocument);

export default router;
