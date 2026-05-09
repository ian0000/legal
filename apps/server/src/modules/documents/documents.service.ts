import Document from "../../models/Documents";

import type {
  CreateDocumentDTO,
  UpdateDocumentDTO,
} from "@legal/shared/src/schemas/documents.schema";

import Case from "../../models/Case";
import CaseStage from "../../models/Stage";

import { CreateError } from "../../utils/CreateError";

// =====================================
// CREATE DOCUMENT
// =====================================

export const createDocument = async (userId: string, data: CreateDocumentDTO) => {
  if (data.size > 15 * 1024 * 1024) {
    throw CreateError("El archivo excede el tamaño permitido de 15MB", 400);
  }
  const legalCase = await Case.findOne({
    _id: data.caseId,
    isDeleted: false,
  });

  if (!legalCase) {
    throw CreateError("Caso no encontrado", 404);
  }

  if (data.stageId) {
    const stage = await CaseStage.findOne({
      _id: data.stageId,
      caseId: data.caseId,
    });

    if (!stage) {
      throw CreateError("Etapa no encontrada", 404);
    }
  }
  const document = await Document.create({
    ...data,

    uploadedBy: userId,
  });

  return document;
};

// =====================================
// GET CASE DOCUMENTS
// =====================================

export const getCaseDocuments = async (caseId: string) => {
  return await Document.find({
    caseId,
    isDeleted: false,
  })
    .select("-file")
    .populate("uploadedBy", "firstName lastName email")
    .populate("stageId", "title")
    .sort({
      createdAt: -1,
    });
};

// =====================================
// GET DOCUMENT BY ID
// =====================================

export const getDocumentById = async (documentId: string) => {
  const document = await Document.findOne({
    _id: documentId,
    isDeleted: false,
  })
    .populate("uploadedBy", "firstName lastName email")
    .populate("stageId", "title");

  if (!document) {
    throw CreateError("Documento no encontrado", 404);
  }

  return document;
};

// =====================================
// UPDATE DOCUMENT
// =====================================

export const updateDocument = async (documentId: string, data: UpdateDocumentDTO) => {
  const document = await Document.findOne({
    _id: documentId,
    isDeleted: false,
  });

  if (!document) {
    throw CreateError("Documento no encontrado", 404);
  }

  if (data.name !== undefined) {
    document.name = data.name;
  }

  if (data.visibility !== undefined) {
    document.visibility = data.visibility;
  }

  if (data.documentType !== undefined) {
    document.documentType = data.documentType;
  }

  if (data.tags !== undefined) {
    document.tags = data.tags;
  }

  if (data.version !== undefined) {
    document.version = data.version;
  }

  await document.save();

  return document;
};

// =====================================
// DELETE DOCUMENT
// =====================================

export const deleteDocument = async (documentId: string) => {
  const document = await Document.findOne({
    _id: documentId,
    isDeleted: false,
  });

  if (!document) {
    throw CreateError("Documento no encontrado", 404);
  }

  document.isDeleted = true;

  document.deletedAt = new Date();

  await document.save();

  return {
    message: "Documento eliminado correctamente",
  };
};
