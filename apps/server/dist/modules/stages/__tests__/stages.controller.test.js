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
const controller = __importStar(require("../stages.controller"));
const service = __importStar(require("../stages.service"));
jest.mock("../stages.service");
describe("Case Stages Controller", () => {
    const res = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
//# sourceMappingURL=stages.controller.test.js.map