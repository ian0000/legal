import Activity from "../../../models/Activities";

import * as ActivitiesService from "../activities.service";

jest.mock("../../../models/Activities");

describe("Activities Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================
  // CREATE ACTIVITY
  // =====================================

  describe("createActivity", () => {
    it("should create activity", async () => {
      const activityData = {
        userId: "1",

        caseId: "2",

        action: "CASE_CREATED",

        description: "Caso creado",
      };

      (Activity.create as jest.Mock).mockResolvedValue(activityData);

      const result = await ActivitiesService.createActivity(activityData as any);

      expect(Activity.create).toHaveBeenCalledWith(activityData);

      expect(result).toEqual(activityData);
    });
  });

  // =====================================
  // GET ACTIVITIES
  // =====================================

  describe("getActivities", () => {
    it("should return paginated activities", async () => {
      const activities = [
        {
          _id: "1",
          action: "CASE_CREATED",
        },
      ];

      const limitMock = jest.fn().mockResolvedValue(activities);

      const skipMock = jest.fn().mockReturnValue({
        limit: limitMock,
      });

      const sortMock = jest.fn().mockReturnValue({
        skip: skipMock,
      });

      const populateStageMock = jest.fn().mockReturnValue({
        sort: sortMock,
      });

      const populateCaseMock = jest.fn().mockReturnValue({
        populate: populateStageMock,
      });

      const populateUserMock = jest.fn().mockReturnValue({
        populate: populateCaseMock,
      });

      (Activity.find as jest.Mock).mockReturnValue({
        populate: populateUserMock,
      });

      (Activity.countDocuments as jest.Mock).mockResolvedValue(1);

      const result = await ActivitiesService.getActivities({
        page: 1,
        limit: 20,
      });

      expect(Activity.find).toHaveBeenCalled();

      expect(result.total).toBe(1);

      expect(result.data).toEqual(activities);
    });
  });

  // =====================================
  // GET CASE ACTIVITIES
  // =====================================

  describe("getCaseActivities", () => {
    it("should return case activities", async () => {
      const activities = [
        {
          _id: "1",
        },
      ];

      const sortMock = jest.fn().mockResolvedValue(activities);

      const populateStageMock = jest.fn().mockReturnValue({
        sort: sortMock,
      });

      const populateUserMock = jest.fn().mockReturnValue({
        populate: populateStageMock,
      });

      (Activity.find as jest.Mock).mockReturnValue({
        populate: populateUserMock,
      });

      const result = await ActivitiesService.getCaseActivities("case-id");

      expect(Activity.find).toHaveBeenCalledWith({
        caseId: "case-id",
        isDeleted: false,
      });

      expect(result).toEqual(activities);
    });
  });

  // =====================================
  // GET ACTIVITY BY ID
  // =====================================

  describe("getActivityById", () => {
    it("should return activity by id", async () => {
      const activity = {
        _id: "1",
      };

      const populateStageMock = jest.fn().mockResolvedValue(activity);

      const populateCaseMock = jest.fn().mockReturnValue({
        populate: populateStageMock,
      });

      const populateUserMock = jest.fn().mockReturnValue({
        populate: populateCaseMock,
      });

      (Activity.findOne as jest.Mock).mockReturnValue({
        populate: populateUserMock,
      });

      const result = await ActivitiesService.getActivityById("1");

      expect(Activity.findOne).toHaveBeenCalledWith({
        _id: "1",
        isDeleted: false,
      });

      expect(result).toEqual(activity);
    });

    it("should throw if activity not found", async () => {
      const populateStageMock = jest.fn().mockResolvedValue(null);

      const populateCaseMock = jest.fn().mockReturnValue({
        populate: populateStageMock,
      });

      const populateUserMock = jest.fn().mockReturnValue({
        populate: populateCaseMock,
      });

      (Activity.findOne as jest.Mock).mockReturnValue({
        populate: populateUserMock,
      });

      await expect(ActivitiesService.getActivityById("1")).rejects.toThrow(
        "Actividad no encontrada",
      );
    });
  });

  // =====================================
  // DELETE ACTIVITY
  // =====================================

  describe("deleteActivity", () => {
    it("should soft delete activity", async () => {
      const saveMock = jest.fn();

      (Activity.findOne as jest.Mock).mockResolvedValue({
        isDeleted: false,

        deletedAt: null,

        save: saveMock,
      });

      await ActivitiesService.deleteActivity("1");

      expect(saveMock).toHaveBeenCalled();
    });

    it("should throw if activity not found", async () => {
      (Activity.findOne as jest.Mock).mockResolvedValue(null);

      await expect(ActivitiesService.deleteActivity("1")).rejects.toThrow(
        "Actividad no encontrada",
      );
    });
  });
});
