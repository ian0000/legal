"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getDocumentById = exports.getCaseDocuments = exports.createDocument = void 0;
const Documents_1 = __importDefault(require("../../models/Documents"));
const Case_1 = __importDefault(require("../../models/Case"));
const Stage_1 = __importDefault(require("../../models/Stage"));
const CreateError_1 = require("../../utils/CreateError");
// =====================================
// CREATE DOCUMENT
// =====================================
const createDocument = async (userId, data) => {
    if (data.size > 15 * 1024 * 1024) {
        throw (0, CreateError_1.CreateError)("El archivo excede el tamaño permitido de 15MB", 400);
    }
    const legalCase = await Case_1.default.findOne({
        _id: data.caseId,
        isDeleted: false,
    });
    if (!legalCase) {
        throw (0, CreateError_1.CreateError)("Caso no encontrado", 404);
    }
    if (data.stageId) {
        const stage = await Stage_1.default.findOne({
            _id: data.stageId,
            caseId: data.caseId,
        });
        if (!stage) {
            throw (0, CreateError_1.CreateError)("Etapa no encontrada", 404);
        }
    }
    const document = await Documents_1.default.create({
        ...data,
        uploadedBy: userId,
    });
    return document;
};
exports.createDocument = createDocument;
// =====================================
// GET CASE DOCUMENTS
// =====================================
const getCaseDocuments = async (caseId) => {
    return await Documents_1.default.find({
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
exports.getCaseDocuments = getCaseDocuments;
// =====================================
// GET DOCUMENT BY ID
// =====================================
const getDocumentById = async (documentId) => {
    const document = await Documents_1.default.findOne({
        _id: documentId,
        isDeleted: false,
    })
        .populate("uploadedBy", "firstName lastName email")
        .populate("stageId", "title");
    if (!document) {
        throw (0, CreateError_1.CreateError)("Documento no encontrado", 404);
    }
    return document;
};
exports.getDocumentById = getDocumentById;
// =====================================
// UPDATE DOCUMENT
// =====================================
const updateDocument = async (documentId, data) => {
    const document = await Documents_1.default.findOne({
        _id: documentId,
        isDeleted: false,
    });
    if (!document) {
        throw (0, CreateError_1.CreateError)("Documento no encontrado", 404);
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
exports.updateDocument = updateDocument;
// =====================================
// DELETE DOCUMENT
// =====================================
const deleteDocument = async (documentId) => {
    const document = await Documents_1.default.findOne({
        _id: documentId,
        isDeleted: false,
    });
    if (!document) {
        throw (0, CreateError_1.CreateError)("Documento no encontrado", 404);
    }
    document.isDeleted = true;
    document.deletedAt = new Date();
    await document.save();
    return {
        message: "Documento eliminado correctamente",
    };
};
exports.deleteDocument = deleteDocument;
//# sourceMappingURL=documents.service.js.map