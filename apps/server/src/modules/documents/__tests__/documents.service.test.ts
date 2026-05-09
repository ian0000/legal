import Document from "../../../models/Documents";
import Case from "../../../models/Case";
import CaseStage from "../../../models/Stage";

import * as documentsService from "../documents.service";

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
      (Case.findOne as jest.Mock).mockResolvedValue({
        _id: "case-1",
      });

      (CaseStage.findOne as jest.Mock).mockResolvedValue({
        _id: "stage-1",
      });

      (Document.create as jest.Mock).mockResolvedValue({
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

      expect(Document.create).toHaveBeenCalled();

      expect(result).toBeDefined();
    });

    it("should throw if case does not exist", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        documentsService.createDocument("user-1", {
          caseId: "case-1",
          name: "Contrato",
          originalName: "contrato.pdf",
          mimeType: "application/pdf",
          size: 1000,
          file: Buffer.from("test"),
        }),
      ).rejects.toThrow("Caso no encontrado");
    });

    it("should throw if stage does not exist", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue({
        _id: "case-1",
      });

      (CaseStage.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        documentsService.createDocument("user-1", {
          caseId: "case-1",
          stageId: "stage-1",
          name: "Contrato",
          originalName: "contrato.pdf",
          mimeType: "application/pdf",
          size: 1000,
          file: Buffer.from("test"),
        }),
      ).rejects.toThrow("Etapa no encontrada");
    });

    it("should throw if file exceeds limit", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue({
        _id: "case-1",
      });

      await expect(
        documentsService.createDocument("user-1", {
          caseId: "case-1",
          name: "Contrato",
          originalName: "contrato.pdf",
          mimeType: "application/pdf",
          size: 20 * 1024 * 1024,
          file: Buffer.from("test"),
        }),
      ).rejects.toThrow("El archivo excede el tamaño permitido de 15MB");
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

      (Document.find as jest.Mock).mockReturnValue({
        select: selectMock,
      });

      await documentsService.getCaseDocuments("case-1");

      expect(Document.find).toHaveBeenCalled();
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

      (Document.findOne as jest.Mock).mockReturnValue({
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

      (Document.findOne as jest.Mock).mockReturnValue({
        populate: populateMock1,
      });

      await expect(documentsService.getDocumentById("document-1")).rejects.toThrow(
        "Documento no encontrado",
      );
    });
  });

  // =====================================
  // UPDATE DOCUMENT
  // =====================================

  describe("updateDocument", () => {
    it("should update document", async () => {
      const saveMock = jest.fn();

      (Document.findOne as jest.Mock).mockResolvedValue({
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
      (Document.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        documentsService.updateDocument("document-1", {
          name: "New",
        }),
      ).rejects.toThrow("Documento no encontrado");
    });
  });

  // =====================================
  // DELETE DOCUMENT
  // =====================================

  describe("deleteDocument", () => {
    it("should soft delete document", async () => {
      const saveMock = jest.fn();

      (Document.findOne as jest.Mock).mockResolvedValue({
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
      (Document.findOne as jest.Mock).mockResolvedValue(null);

      await expect(documentsService.deleteDocument("document-1")).rejects.toThrow(
        "Documento no encontrado",
      );
    });
  });
});
