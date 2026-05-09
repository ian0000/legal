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
const Stage_1 = __importDefault(require("../../../models/Stage"));
const Case_1 = __importDefault(require("../../../models/Case"));
const CaseStagesService = __importStar(require("../stages.service"));
const ActivitiesService = __importStar(require("../../activities/activities.service"));
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
            Case_1.default.findById.mockResolvedValue({
                _id: "case-id",
                currentStageId: null,
                save: saveMock,
            });
            Stage_1.default.findOne.mockReturnValue({
                sort: jest.fn().mockResolvedValue(null),
            });
            Stage_1.default.create.mockResolvedValue({
                _id: "stage-id",
                caseId: "case-id",
                title: "Demanda",
            });
            await CaseStagesService.createStage("507f1f77bcf86cd799439012", {
                caseId: "case-id",
                title: "Demanda",
            });
            expect(Stage_1.default.create).toHaveBeenCalled();
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
            Stage_1.default.find.mockReturnValue({
                populate: populateMock1,
            });
            await CaseStagesService.getCaseStages("case-id");
            expect(Stage_1.default.find).toHaveBeenCalledWith({
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
            Stage_1.default.findOne.mockReturnValue({
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
            Stage_1.default.findOne.mockReturnValue({
                populate: populateMock1,
            });
            await expect(CaseStagesService.getStageById("stage-id")).rejects.toThrow("Etapa no encontrada");
        });
    });
    // =====================================
    // UPDATE STAGE
    // =====================================
    describe("updateStage", () => {
        it("should update stage", async () => {
            const saveMock = jest.fn();
            Stage_1.default.findOne.mockResolvedValue({
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
            Stage_1.default.findOne.mockResolvedValue({
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
            Stage_1.default.findOne
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
                status: "COMPLETED",
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
            Stage_1.default.findOne.mockReset();
            Stage_1.default.findOne.mockResolvedValue({
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
            Stage_1.default.findOne.mockResolvedValue({
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
//# sourceMappingURL=stages.service.test.js.map