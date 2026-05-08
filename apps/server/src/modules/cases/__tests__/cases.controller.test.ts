// src/modules/cases/__tests__/cases.controller.test.ts

import * as controller from "../cases.controller";

import * as casesService from "../cases.service";

jest.mock("../cases.service");

describe("Cases Controller", () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),

    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================
  // CREATE CASE
  // =====================================

  describe("createCase", () => {
    it("should create case", async () => {
      const req: any = {
        user: {
          id: "user-id",
        },

        body: {
          code: "CASE-001",
        },
      };

      await controller.createCase(req, res, next);

      expect(casesService.createCase).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  // =====================================
  // GET CASES
  // =====================================

  describe("getCases", () => {
    it("should get all cases", async () => {
      const req: any = {
        query: {},
      };

      await controller.getCases(req, res, next);

      expect(casesService.getCases).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // GET CASE BY ID
  // =====================================

  describe("getCaseById", () => {
    it("should get case by id", async () => {
      const req: any = {
        params: {
          id: "case-id",
        },
      };

      await controller.getCaseById(req, res, next);

      expect(casesService.getCaseById).toHaveBeenCalledWith("case-id");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // UPDATE CASE
  // =====================================

  describe("updateCase", () => {
    it("should update case", async () => {
      const req: any = {
        params: {
          id: "case-id",
        },

        body: {
          title: "Updated",
        },
      };

      await controller.updateCase(req, res, next);

      expect(casesService.updateCase).toHaveBeenCalledWith("case-id", req.body);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // DELETE CASE
  // =====================================
  describe("deleteCase", () => {
    it("should delete case", async () => {
      const req: any = {
        params: {
          id: "case-id",
        },

        user: {
          id: "user-id",
        },
      };

      await controller.deleteCase(req, res, next);

      expect(casesService.deleteCase).toHaveBeenCalledWith("case-id", "user-id");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
