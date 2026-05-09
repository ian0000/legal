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
const Activities_1 = __importDefault(require("../../../models/Activities"));
const ActivitiesService = __importStar(require("../activities.service"));
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
            Activities_1.default.create.mockResolvedValue(activityData);
            const result = await ActivitiesService.createActivity(activityData);
            expect(Activities_1.default.create).toHaveBeenCalledWith(activityData);
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
            Activities_1.default.find.mockReturnValue({
                populate: populateUserMock,
            });
            Activities_1.default.countDocuments.mockResolvedValue(1);
            const result = await ActivitiesService.getActivities({
                page: 1,
                limit: 20,
            });
            expect(Activities_1.default.find).toHaveBeenCalled();
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
            Activities_1.default.find.mockReturnValue({
                populate: populateUserMock,
            });
            const result = await ActivitiesService.getCaseActivities("case-id");
            expect(Activities_1.default.find).toHaveBeenCalledWith({
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
            Activities_1.default.findOne.mockReturnValue({
                populate: populateUserMock,
            });
            const result = await ActivitiesService.getActivityById("1");
            expect(Activities_1.default.findOne).toHaveBeenCalledWith({
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
            Activities_1.default.findOne.mockReturnValue({
                populate: populateUserMock,
            });
            await expect(ActivitiesService.getActivityById("1")).rejects.toThrow("Actividad no encontrada");
        });
    });
    // =====================================
    // DELETE ACTIVITY
    // =====================================
    describe("deleteActivity", () => {
        it("should soft delete activity", async () => {
            const saveMock = jest.fn();
            Activities_1.default.findOne.mockResolvedValue({
                isDeleted: false,
                deletedAt: null,
                save: saveMock,
            });
            await ActivitiesService.deleteActivity("1");
            expect(saveMock).toHaveBeenCalled();
        });
        it("should throw if activity not found", async () => {
            Activities_1.default.findOne.mockResolvedValue(null);
            await expect(ActivitiesService.deleteActivity("1")).rejects.toThrow("Actividad no encontrada");
        });
    });
});
//# sourceMappingURL=activities.service.test.js.map