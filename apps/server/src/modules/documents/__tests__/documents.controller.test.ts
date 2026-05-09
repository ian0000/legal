import * as controller from "../documents.controller";
import * as documentsService from "../documents.service";

jest.mock("../documents.service");

describe("Documents Controller", () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================
  // CREATE DOCUMENT
  // =====================================

  describe("createDocument", () => {
    it("should create document", async () => {
      const req: any = {
        user: {
          id: "user-1",
        },

        body: {
          name: "Contrato",
        },
      };

      await controller.createDocument(req, res, next);

      expect(documentsService.createDocument).toHaveBeenCalledWith("user-1", req.body);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  // =====================================
  // GET CASE DOCUMENTS
  // =====================================

  describe("getCaseDocuments", () => {
    it("should return case documents", async () => {
      const req: any = {
        params: {
          caseId: "case-1",
        },
      };

      await controller.getCaseDocuments(req, res, next);

      expect(documentsService.getCaseDocuments).toHaveBeenCalledWith("case-1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // GET DOCUMENT BY ID
  // =====================================

  describe("getDocumentById", () => {
    it("should return document", async () => {
      const req: any = {
        params: {
          documentId: "document-1",
        },
      };

      await controller.getDocumentById(req, res, next);

      expect(documentsService.getDocumentById).toHaveBeenCalledWith("document-1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // UPDATE DOCUMENT
  // =====================================

  describe("updateDocument", () => {
    it("should update document", async () => {
      const req: any = {
        params: {
          documentId: "document-1",
        },

        body: {
          name: "Updated",
        },
      };

      await controller.updateDocument(req, res, next);

      expect(documentsService.updateDocument).toHaveBeenCalledWith("document-1", req.body);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // DELETE DOCUMENT
  // =====================================

  describe("deleteDocument", () => {
    it("should delete document", async () => {
      const req: any = {
        params: {
          documentId: "document-1",
        },
      };

      await controller.deleteDocument(req, res, next);

      expect(documentsService.deleteDocument).toHaveBeenCalledWith("document-1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
