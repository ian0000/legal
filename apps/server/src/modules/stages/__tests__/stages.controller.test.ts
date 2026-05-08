import * as controller from "../stages.controller";
import * as service from "../stages.service";

jest.mock("../stages.service");

describe("Case Stages Controller", () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================
  // CREATE
  // =====================================

  describe("createStage", () => {
    it("should create stage", async () => {
      const req: any = {
        user: {
          id: "user-id",
        },

        params: {
          caseId: "case-id",
        },

        body: {
          title: "Demanda",
        },
      };

      await controller.createStage(req, res, next);

      expect(service.createStage).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  // =====================================
  // GET CASE STAGES
  // =====================================

  describe("getCaseStages", () => {
    it("should return stages", async () => {
      const req: any = {
        params: {
          caseId: "case-id",
        },
      };

      await controller.getCaseStages(req, res, next);

      expect(service.getCaseStages).toHaveBeenCalledWith("case-id");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // GET ONE
  // =====================================

  describe("getStageById", () => {
    it("should return stage", async () => {
      const req: any = {
        params: {
          id: "stage-id",
        },
      };

      await controller.getStageById(req, res, next);

      expect(service.getStageById).toHaveBeenCalledWith("stage-id");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // UPDATE
  // =====================================

  describe("updateStage", () => {
    it("should update stage", async () => {
      const req: any = {
        params: {
          id: "stage-id",
        },

        body: {
          title: "Updated",
        },
      };

      await controller.updateStage(req, res, next);

      expect(service.updateStage).toHaveBeenCalledWith("stage-id", req.body);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // DELETE
  // =====================================

  describe("deleteStage", () => {
    it("should delete stage", async () => {
      const req: any = {
        params: {
          id: "stage-id",
        },
      };

      await controller.deleteStage(req, res, next);

      expect(service.deleteStage).toHaveBeenCalledWith("stage-id");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // UPDATE STATUS
  // =====================================

  describe("updateStageStatus", () => {
    it("should update status", async () => {
      const req: any = {
        user: {
          id: "user-id",
        },

        params: {
          id: "stage-id",
        },

        body: {
          status: "COMPLETED",
        },
      };

      await controller.updateStageStatus(req, res, next);

      expect(service.updateStageStatus).toHaveBeenCalledWith("user-id", "stage-id", req.body);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // ASSIGN
  // =====================================

  describe("assignStage", () => {
    it("should assign stage", async () => {
      const req: any = {
        user: {
          id: "user-id",
        },

        params: {
          id: "stage-id",
        },

        body: {
          assignedTo: "lawyer-id",
        },
      };

      await controller.assignStage(req, res, next);

      expect(service.assignStage).toHaveBeenCalledWith("user-id", "stage-id", req.body);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // REORDER
  // =====================================

  describe("reorderStage", () => {
    it("should reorder stage", async () => {
      const req: any = {
        params: {
          id: "stage-id",
        },

        body: {
          order: 2,
        },
      };

      await controller.reorderStage(req, res, next);

      expect(service.reorderStage).toHaveBeenCalledWith("stage-id", req.body);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
