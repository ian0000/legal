"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getDocumentById = exports.getCaseDocuments = exports.createDocument = void 0;
const documentsService = __importStar(require("./documents.service"));
// =====================================
// CREATE DOCUMENT
// =====================================
const createDocument = async (req, res, next) => {
    try {
        const document = await documentsService.createDocument(req.user.id, req.body);
        res.status(201).json(document);
    }
    catch (error) {
        next(error);
    }
};
exports.createDocument = createDocument;
// =====================================
// GET CASE DOCUMENTS
// =====================================
const getCaseDocuments = async (req, res, next) => {
    try {
        const documents = await documentsService.getCaseDocuments(req.params.caseId);
        res.status(200).json(documents);
    }
    catch (error) {
        next(error);
    }
};
exports.getCaseDocuments = getCaseDocuments;
// =====================================
// GET DOCUMENT BY ID
// =====================================
const getDocumentById = async (req, res, next) => {
    try {
        const document = await documentsService.getDocumentById(req.params.documentId);
        res.status(200).json(document);
    }
    catch (error) {
        next(error);
    }
};
exports.getDocumentById = getDocumentById;
// =====================================
// UPDATE DOCUMENT
// =====================================
const updateDocument = async (req, res, next) => {
    try {
        const document = await documentsService.updateDocument(req.params.documentId, req.body);
        res.status(200).json(document);
    }
    catch (error) {
        next(error);
    }
};
exports.updateDocument = updateDocument;
// =====================================
// DELETE DOCUMENT
// =====================================
const deleteDocument = async (req, res, next) => {
    try {
        const result = await documentsService.deleteDocument(req.params.documentId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteDocument = deleteDocument;
//# sourceMappingURL=documents.controller.js.map