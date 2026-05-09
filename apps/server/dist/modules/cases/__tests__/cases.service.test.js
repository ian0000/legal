"use strict";
// src/modules/cases/__tests__/cases.service.test.ts
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
const Case_1 = __importDefault(require("../../../models/Case"));
const Client_1 = __importDefault(require("../../../models/Client"));
const User_1 = __importDefault(require("../../../models/User"));
const Activities_1 = __importDefault(require("../../../models/Activities"));
const casesService = __importStar(require("../cases.service"));
jest.mock("../../../models/Case");
jest.mock("../../../models/Client");
jest.mock("../../../models/User");
jest.mock("../../../models/Activities");
describe("Cases Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // =====================================
    // CREATE CASE
    // =====================================
    describe("createCase", () => {
        it("should create case correctly", async () => {
            Case_1.default.findOne.mockResolvedValue(null);
            Client_1.default.findById.mockResolvedValue({
                _id: "client-id",
            });
            User_1.default.findById.mockResolvedValue({
                _id: "lawyer-id",
            });
            User_1.default.find.mockResolvedValue([
                {
                    _id: "assigned-user",
                },
            ]);
            Case_1.default.create.mockResolvedValue({
                _id: "case-id",
                code: "CASE-001",
            });
            Activities_1.default.create.mockResolvedValue({});
            const result = await casesService.createCase({
                code: "CASE-001",
                title: "Caso prueba",
                clientId: "client-id",
                principalLawyerId: "lawyer-id",
                assignedUsers: ["assigned-user"],
                createdBy: "user-id",
            });
            expect(Case_1.default.create).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
        it("should throw if case code already exists", async () => {
            Case_1.default.findOne.mockResolvedValue({});
            await expect(casesService.createCase({
                code: "CASE-001",
                title: "Caso",
                clientId: "client-id",
                principalLawyerId: "lawyer-id",
                createdBy: "user-id",
            })).rejects.toThrow("Ya existe un caso con ese código");
        });
        it("should throw if client does not exist", async () => {
            Case_1.default.findOne.mockResolvedValue(null);
            Client_1.default.findById.mockResolvedValue(null);
            await expect(casesService.createCase({
                code: "CASE-001",
                title: "Caso",
                clientId: "client-id",
                principalLawyerId: "lawyer-id",
                createdBy: "user-id",
            })).rejects.toThrow("Cliente no encontrado");
        });
        it("should throw if lawyer does not exist", async () => {
            Case_1.default.findOne.mockResolvedValue(null);
            Client_1.default.findById.mockResolvedValue({
                _id: "client-id",
            });
            User_1.default.findById.mockResolvedValue(null);
            await expect(casesService.createCase({
                code: "CASE-001",
                title: "Caso",
                clientId: "client-id",
                principalLawyerId: "lawyer-id",
                createdBy: "user-id",
            })).rejects.toThrow("Abogado principal no encontrado");
        });
        it("should throw if assigned users do not exist", async () => {
            Case_1.default.findOne.mockResolvedValue(null);
            Client_1.default.findById.mockResolvedValue({
                _id: "client-id",
            });
            User_1.default.findById.mockResolvedValue({
                _id: "lawyer-id",
            });
            User_1.default.find.mockResolvedValue([]);
            await expect(casesService.createCase({
                code: "CASE-001",
                title: "Caso",
                clientId: "client-id",
                principalLawyerId: "lawyer-id",
                assignedUsers: ["user-1"],
                createdBy: "user-id",
            })).rejects.toThrow("Uno o más usuarios asignados no existen");
        });
        it("should throw if code is empty", async () => {
            await expect(casesService.createCase({
                code: "",
                title: "Caso",
                clientId: "client-id",
                principalLawyerId: "lawyer-id",
                createdBy: "user-id",
            })).rejects.toThrow("El código es obligatorio");
        });
        it("should throw if title is empty", async () => {
            await expect(casesService.createCase({
                code: "CASE-001",
                title: "",
                clientId: "client-id",
                principalLawyerId: "lawyer-id",
                createdBy: "user-id",
            })).rejects.toThrow("El título es obligatorio");
        });
    });
    // =====================================
    // GET CASES
    // =====================================
    describe("getCases", () => {
        it("should return paginated cases", async () => {
            const limitMock = jest.fn().mockResolvedValue([]);
            const skipMock = jest.fn().mockReturnValue({
                limit: limitMock,
            });
            const sortMock = jest.fn().mockReturnValue({
                skip: skipMock,
            });
            const populate4 = jest.fn().mockReturnValue({
                sort: sortMock,
            });
            const populate3 = jest.fn().mockReturnValue({
                populate: populate4,
            });
            const populate2 = jest.fn().mockReturnValue({
                populate: populate3,
            });
            const populate1 = jest.fn().mockReturnValue({
                populate: populate2,
            });
            Case_1.default.find.mockReturnValue({
                populate: populate1,
            });
            Case_1.default.countDocuments.mockResolvedValue(0);
            const result = await casesService.getCases();
            expect(result).toEqual({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    limit: 10,
                    totalPages: 0,
                },
            });
        });
    });
    // =====================================
    // GET CASE BY ID
    // =====================================
    describe("getCaseById", () => {
        it("should return case by id", async () => {
            const populateMock = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockReturnValue({
                        populate: jest.fn().mockResolvedValue({
                            _id: "case-id",
                        }),
                    }),
                }),
            });
            Case_1.default.findOne.mockReturnValue({
                populate: populateMock,
            });
            const result = await casesService.getCaseById("case-id");
            expect(result).toBeDefined();
        });
        it("should throw if case does not exist", async () => {
            const populateMock = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockReturnValue({
                        populate: jest.fn().mockResolvedValue(null),
                    }),
                }),
            });
            Case_1.default.findOne.mockReturnValue({
                populate: populateMock,
            });
            await expect(casesService.getCaseById("invalid-id")).rejects.toThrow("Caso no encontrado");
        });
    });
    // =====================================
    // UPDATE CASE
    // =====================================
    describe("updateCase", () => {
        it("should update case", async () => {
            const saveMock = jest.fn();
            Case_1.default.findOne.mockResolvedValue({
                _id: "case-id",
                code: "CASE-001",
                status: "ACTIVE",
                createdBy: "user-id",
                save: saveMock,
            });
            Activities_1.default.create.mockResolvedValue({});
            const result = await casesService.updateCase("1", {
                title: "New",
            });
            expect(saveMock).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
        it("should throw if case does not exist", async () => {
            Case_1.default.findOne.mockResolvedValue(null);
            await expect(casesService.updateCase("invalid-id", {
                title: "New",
            })).rejects.toThrow("Caso no encontrado");
        });
    });
    // =====================================
    // DELETE CASE
    // =====================================
    describe("deleteCase", () => {
        it("should soft delete case", async () => {
            const saveMock = jest.fn();
            Case_1.default.findOne.mockResolvedValue({
                _id: "case-id",
                code: "CASE-001",
                isDeleted: false,
                save: saveMock,
            });
            Activities_1.default.create.mockResolvedValue({});
            const result = await casesService.deleteCase("case-id", "user-id");
            expect(saveMock).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
            expect(result).toEqual({
                message: "Caso eliminado correctamente",
            });
        });
        it("should throw if case does not exist", async () => {
            Case_1.default.findOne.mockResolvedValue(null);
            await expect(casesService.deleteCase("invalid-id", "user-id")).rejects.toThrow("Caso no encontrado");
        });
    });
});
//# sourceMappingURL=cases.service.test.js.map