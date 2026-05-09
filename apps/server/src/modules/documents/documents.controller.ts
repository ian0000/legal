import { NextFunction, Request, Response } from "express";

import * as documentsService from "./documents.service";

// =====================================
// CREATE DOCUMENT
// =====================================

export const createDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const document = await documentsService.createDocument(req.user!.id, req.body);

    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET CASE DOCUMENTS
// =====================================

export const getCaseDocuments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const documents = await documentsService.getCaseDocuments(req.params.caseId as string);

    res.status(200).json(documents);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET DOCUMENT BY ID
// =====================================

export const getDocumentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const document = await documentsService.getDocumentById(req.params.documentId as string);

    res.status(200).json(document);
  } catch (error) {
    next(error);
  }
};

// =====================================
// UPDATE DOCUMENT
// =====================================

export const updateDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const document = await documentsService.updateDocument(
      req.params.documentId as string,
      req.body,
    );

    res.status(200).json(document);
  } catch (error) {
    next(error);
  }
};

// =====================================
// DELETE DOCUMENT
// =====================================

export const deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await documentsService.deleteDocument(req.params.documentId as string);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
