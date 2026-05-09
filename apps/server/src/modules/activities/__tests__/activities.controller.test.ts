import * as controller from "../activities.controller";

import * as ActivitiesService from "../activities.service";

jest.mock("../activities.service");

describe("Activities Controller", () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),

    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================
  // GET ACTIVITIES
  // =====================================

  describe("getActivities", () => {
    it("should return activities", async () => {
      (ActivitiesService.getActivities as jest.Mock).mockResolvedValue({
        data: [],
      });

      const req: any = {
        query: {},
      };

      await controller.getActivities(req, res, next);

      expect(ActivitiesService.getActivities).toHaveBeenCalledWith(req.query);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should call next on error", async () => {
      const error = new Error("fail");

      (ActivitiesService.getActivities as jest.Mock).mockRejectedValue(error);

      const req: any = {
        query: {},
      };

      await controller.getActivities(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // =====================================
  // GET CASE ACTIVITIES
  // =====================================

  describe("getCaseActivities", () => {
    it("should return case activities", async () => {
      (ActivitiesService.getCaseActivities as jest.Mock).mockResolvedValue([]);

      const req: any = {
        params: {
          caseId: "1",
        },
      };

      await controller.getCaseActivities(req, res, next);

      expect(ActivitiesService.getCaseActivities).toHaveBeenCalledWith("1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // GET ACTIVITY BY ID
  // =====================================

  describe("getActivityById", () => {
    it("should return activity", async () => {
      (ActivitiesService.getActivityById as jest.Mock).mockResolvedValue({
        _id: "1",
      });

      const req: any = {
        params: {
          id: "1",
        },
      };

      await controller.getActivityById(req, res, next);

      expect(ActivitiesService.getActivityById).toHaveBeenCalledWith("1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // DELETE ACTIVITY
  // =====================================

  describe("deleteActivity", () => {
    it("should delete activity", async () => {
      (ActivitiesService.deleteActivity as jest.Mock).mockResolvedValue(undefined);

      const req: any = {
        params: {
          id: "1",
        },
      };

      await controller.deleteActivity(req, res, next);

      expect(ActivitiesService.deleteActivity).toHaveBeenCalledWith("1");

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        message: "Actividad eliminada correctamente",
      });
    });
  });
});
