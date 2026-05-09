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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Documents_1 = __importDefault(require("../../../models/Documents"));
const Case_1 = __importDefault(require("../../../models/Case"));
const Stage_1 = __importDefault(require("../../../models/Stage"));
const documentsService = __importStar(require("../documents.service"));
jest.mock("../../../models/Documents");
jest.mock("../../../models/Case");
jest.mock("../../../models/Stage");
describe("Documents Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // =====================================
    // CREATE DOCUMENT
    // =====================================
    describe("createDocument", () => {
        it("should create document correctly", async () => {
            Case_1.default.findOne.mockResolvedValue({
                _id: "case-1",
            });
            Stage_1.default.findOne.mockResolvedValue({
                _id: "stage-1",
            });
            Documents_1.default.create.mockResolvedValue({
                _id: "document-1",
            });
            const result = await documentsService.createDocument("user-1", {
                caseId: "case-1",
                stageId: "stage-1",
                name: "Contrato",
                originalName: "contrato.pdf",
                mimeType: "application/pdf",
                size: 1000,
                file: Buffer.from("test"),
            });
            expect(Documents_1.default.create).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
        it("should throw if case does not exist", async () => {
            Case_1.default.findOne.mockResolvedValue(null);
            await expect(documentsService.createDocument("user-1", {
                caseId: "case-1",
                name: "Contrato",
                originalName: "contrato.pdf",
                mimeType: "application/pdf",
                size: 1000,
                file: Buffer.from("test"),
            })).rejects.toThrow("Caso no encontrado");
        });
        it("should throw if stage does not exist", async () => {
            Case_1.default.findOne.mockResolvedValue({
                _id: "case-1",
            });
            Stage_1.default.findOne.mockResolvedValue(null);
            await expect(documentsService.createDocument("user-1", {
                caseId: "case-1",
                stageId: "stage-1",
                name: "Contrato",
                originalName: "contrato.pdf",
                mimeType: "application/pdf",
                size: 1000,
                file: Buffer.from("test"),
            })).rejects.toThrow("Etapa no encontrada");
        });
        it("should throw if file exceeds limit", async () => {
            Case_1.default.findOne.mockResolvedValue({
                _id: "case-1",
            });
            await expect(documentsService.createDocument("user-1", {
                caseId: "case-1",
                name: "Contrato",
                originalName: "contrato.pdf",
                mimeType: "application/pdf",
                size: 20 * 1024 * 1024,
                file: Buffer.from("test"),
            })).rejects.toThrow("El archivo excede el tamaño permitido de 15MB");
        });
    });
    // =====================================
    // GET CASE DOCUMENTS
    // =====================================
    describe("getCaseDocuments", () => {
        it("should return case documents", async () => {
            const sortMock = jest.fn().mockResolvedValue([]);
            const populateMock2 = jest.fn().mockReturnValue({
                sort: sortMock,
            });
            const populateMock1 = jest.fn().mockReturnValue({
                populate: populateMock2,
            });
            const selectMock = jest.fn().mockReturnValue({
                populate: populateMock1,
            });
            Documents_1.default.find.mockReturnValue({
                select: selectMock,
            });
            await documentsService.getCaseDocuments("case-1");
            expect(Documents_1.default.find).toHaveBeenCalled();
        });
    });
    // =====================================
    // GET DOCUMENT BY ID
    // =====================================
    describe("getDocumentById", () => {
        it("should return document", async () => {
            const populateMock2 = jest.fn().mockResolvedValue({
                _id: "document-1",
            });
            const populateMock1 = jest.fn().mockReturnValue({
                populate: populateMock2,
            });
            Documents_1.default.findOne.mockReturnValue({
                populate: populateMock1,
            });
            const result = await documentsService.getDocumentById("document-1");
            expect(result).toBeDefined();
        });
        it("should throw if document does not exist", async () => {
            const populateMock2 = jest.fn().mockResolvedValue(null);
            const populateMock1 = jest.fn().mockReturnValue({
                populate: populateMock2,
            });
            Documents_1.default.findOne.mockReturnValue({
                populate: populateMock1,
            });
            await expect(documentsService.getDocumentById("document-1")).rejects.toThrow("Documento no encontrado");
        });
    });
    // =====================================
    // UPDATE DOCUMENT
    // =====================================
    describe("updateDocument", () => {
        it("should update document", async () => {
            const saveMock = jest.fn();
            Documents_1.default.findOne.mockResolvedValue({
                name: "Old",
                save: saveMock,
            });
            const result = await documentsService.updateDocument("document-1", {
                name: "New",
            });
            expect(saveMock).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
        it("should throw if document does not exist", async () => {
            Documents_1.default.findOne.mockResolvedValue(null);
            await expect(documentsService.updateDocument("document-1", {
                name: "New",
            })).rejects.toThrow("Documento no encontrado");
        });
    });
    // =====================================
    // DELETE DOCUMENT
    // =====================================
    describe("deleteDocument", () => {
        it("should soft delete document", async () => {
            const saveMock = jest.fn();
            Documents_1.default.findOne.mockResolvedValue({
                isDeleted: false,
                save: saveMock,
            });
            const result = await documentsService.deleteDocument("document-1");
            expect(saveMock).toHaveBeenCalled();
            expect(result).toEqual({
                message: "Documento eliminado correctamente",
            });
        });
        it("should throw if document does not exist", async () => {
            Documents_1.default.findOne.mockResolvedValue(null);
            await expect(documentsService.deleteDocument("document-1")).rejects.toThrow("Documento no encontrado");
        });
    });
});
//# sourceMappingURL=documents.service.test.js.map