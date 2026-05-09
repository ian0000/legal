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
Object.defineProperty(exports, "__esModule", { value: true });
const controller = __importStar(require("../activities.controller"));
const ActivitiesService = __importStar(require("../activities.service"));
jest.mock("../activities.service");
describe("Activities Controller", () => {
    const res = {
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
            ActivitiesService.getActivities.mockResolvedValue({
                data: [],
            });
            const req = {
                query: {},
            };
            await controller.getActivities(req, res, next);
            expect(ActivitiesService.getActivities).toHaveBeenCalledWith(req.query);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it("should call next on error", async () => {
            const error = new Error("fail");
            ActivitiesService.getActivities.mockRejectedValue(error);
            const req = {
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
            ActivitiesService.getCaseActivities.mockResolvedValue([]);
            const req = {
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
            ActivitiesService.getActivityById.mockResolvedValue({
                _id: "1",
            });
            const req = {
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
            ActivitiesService.deleteActivity.mockResolvedValue(undefined);
            const req = {
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
//# sourceMappingURL=activities.controller.test.js.map