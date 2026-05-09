import CaseStage from "../../../models/Stage";
import CaseModel from "../../../models/Case";
import Activity from "../../../models/Activities";

import * as CaseStagesService from "../stages.service";
import * as ActivitiesService from "../../activities/activities.service";

jest.mock("../../../models/Stage");
jest.mock("../../../models/Case");
jest.mock("../../../models/Activities");
jest.mock("../../activities/activities.service");

describe("Case Stages Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================
  // CREATE STAGE
  // =====================================

  describe("createStage", () => {
    it("should create stage correctly", async () => {
      const saveMock = jest.fn();

      (CaseModel.findById as jest.Mock).mockResolvedValue({
        _id: "case-id",
        currentStageId: null,
        save: saveMock,
      });

      (CaseStage.findOne as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(null),
      });

      (CaseStage.create as jest.Mock).mockResolvedValue({
        _id: "stage-id",

        caseId: "case-id",

        title: "Demanda",
      });

      await CaseStagesService.createStage("507f1f77bcf86cd799439012", {
        caseId: "case-id",
        title: "Demanda",
      });

      expect(CaseStage.create).toHaveBeenCalled();

      expect(ActivitiesService.createActivity).toHaveBeenCalled();

      expect(saveMock).toHaveBeenCalled();
    });
  });

  // =====================================
  // GET CASE STAGES
  // =====================================

  describe("getCaseStages", () => {
    it("should return stages", async () => {
      const sortMock = jest.fn().mockResolvedValue([]);

      const populateMock2 = jest.fn().mockReturnValue({
        sort: sortMock,
      });

      const populateMock1 = jest.fn().mockReturnValue({
        populate: populateMock2,
      });

      (CaseStage.find as jest.Mock).mockReturnValue({
        populate: populateMock1,
      });

      await CaseStagesService.getCaseStages("case-id");

      expect(CaseStage.find).toHaveBeenCalledWith({
        caseId: "case-id",
        isDeleted: false,
      });
    });
  });

  // =====================================
  // GET STAGE BY ID
  // =====================================

  describe("getStageById", () => {
    it("should return stage", async () => {
      const populateMock2 = jest.fn().mockResolvedValue({
        _id: "stage-id",
      });

      const populateMock1 = jest.fn().mockReturnValue({
        populate: populateMock2,
      });

      (CaseStage.findOne as jest.Mock).mockReturnValue({
        populate: populateMock1,
      });

      const result = await CaseStagesService.getStageById("stage-id");

      expect(result).toBeDefined();
    });

    it("should throw if stage not exists", async () => {
      const populateMock2 = jest.fn().mockResolvedValue(null);

      const populateMock1 = jest.fn().mockReturnValue({
        populate: populateMock2,
      });

      (CaseStage.findOne as jest.Mock).mockReturnValue({
        populate: populateMock1,
      });

      await expect(CaseStagesService.getStageById("stage-id")).rejects.toThrow(
        "Etapa no encontrada",
      );
    });
  });

  // =====================================
  // UPDATE STAGE
  // =====================================

  describe("updateStage", () => {
    it("should update stage", async () => {
      const saveMock = jest.fn();

      (CaseStage.findOne as jest.Mock).mockResolvedValue({
        title: "Old",
        isDeleted: false,
        save: saveMock,
      });

      const result = await CaseStagesService.updateStage("stage-id", {
        title: "New",
      });

      expect(saveMock).toHaveBeenCalled();

      expect(result).toBeDefined();
    });
  });

  // =====================================
  // DELETE STAGE
  // =====================================

  describe("deleteStage", () => {
    it("should soft delete stage", async () => {
      const saveMock = jest.fn();

      (CaseStage.findOne as jest.Mock).mockResolvedValue({
        isDeleted: false,
        save: saveMock,
      });

      const result = await CaseStagesService.deleteStage("stage-id");

      expect(saveMock).toHaveBeenCalled();

      expect(result).toEqual({
        message: "Etapa eliminada correctamente",
      });
    });
  });

  // =====================================
  // UPDATE STATUS
  // =====================================

  describe("updateStageStatus", () => {
    it("should update status", async () => {
      const saveMock = jest.fn();

      (CaseStage.findOne as jest.Mock)
        .mockResolvedValueOnce({
          _id: "stage-id",
          caseId: "case-id",
          order: 1,
          isDeleted: false,
          save: saveMock,
        })
        .mockResolvedValueOnce({
          _id: "next-stage",
        });

      await CaseStagesService.updateStageStatus("507f1f77bcf86cd799439012", "stage-id", {
        status: "COMPLETED" as any,
      });

      expect(saveMock).toHaveBeenCalled();

      expect(ActivitiesService.createActivity).toHaveBeenCalled();
    });
  });

  // =====================================
  // ASSIGN STAGE
  // =====================================

  describe("assignStage", () => {
    it("should assign stage", async () => {
      const saveMock = jest.fn();

      (CaseStage.findOne as jest.Mock).mockReset();

      (CaseStage.findOne as jest.Mock).mockResolvedValue({
        _id: "stage-id",
        caseId: "case-id",

        isDeleted: false,

        assignedTo: null,
        assignedBy: null,

        save: saveMock,
      });

      await CaseStagesService.assignStage("507f1f77bcf86cd799439012", "stage-id", {
        assignedTo: "507f1f77bcf86cd799439011",
      });

      expect(saveMock).toHaveBeenCalled();

      expect(ActivitiesService.createActivity).toHaveBeenCalled();
    });
  });

  // =====================================
  // REORDER STAGE
  // =====================================

  describe("reorderStage", () => {
    it("should reorder stage", async () => {
      const saveMock = jest.fn();

      (CaseStage.findOne as jest.Mock).mockResolvedValue({
        order: 1,
        isDeleted: false,
        save: saveMock,
      });

      const result = await CaseStagesService.reorderStage("stage-id", {
        order: 2,
      });

      expect(saveMock).toHaveBeenCalled();

      expect(result).toBeDefined();
    });
  });
});
