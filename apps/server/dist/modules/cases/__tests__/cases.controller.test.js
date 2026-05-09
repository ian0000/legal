"use strict";
// src/modules/cases/__tests__/cases.controller.test.ts
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
const controller = __importStar(require("../cases.controller"));
const casesService = __importStar(require("../cases.service"));
jest.mock("../cases.service");
describe("Cases Controller", () => {
    const res = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
//# sourceMappingURL=cases.controller.test.js.map