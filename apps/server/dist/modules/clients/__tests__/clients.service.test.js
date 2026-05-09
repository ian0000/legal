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
const Client_1 = __importDefault(require("../../../models/Client"));
const User_1 = __importDefault(require("../../../models/User"));
const Case_1 = __importDefault(require("../../../models/Case"));
const clientService = __importStar(require("../clients.service"));
const verification_token_1 = require("../../../utils/verification-token");
const auth_email_service_1 = require("../../auth/auth.email.service");
const cases_1 = require("@legal/shared/src/types/cases");
jest.mock("../../../models/Client");
jest.mock("../../../models/User");
jest.mock("../../../models/Case");
jest.mock("../../../utils/verification-token");
jest.mock("../../auth/auth.email.service");
describe("Client Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // =====================================
    // CREATE CLIENT
    // =====================================
    describe("createClient", () => {
        it("should create client correctly", async () => {
            Client_1.default.findOne.mockResolvedValue(null);
            User_1.default.findOne.mockResolvedValue(null);
            User_1.default.create.mockResolvedValue({
                _id: "user-id",
                email: "client@test.com",
                firstName: "Ian",
                lastName: "Mena",
            });
            Client_1.default.create.mockResolvedValue({
                _id: "client-id",
            });
            verification_token_1.createVerificationToken.mockResolvedValue({
                rawToken: "token",
            });
            await clientService.createClient({
                firstName: "Ian",
                lastName: "Mena",
                cedula: "1234567890",
                email: "client@test.com",
            }, "admin-id");
            expect(User_1.default.create).toHaveBeenCalled();
            expect(Client_1.default.create).toHaveBeenCalled();
            expect(verification_token_1.createVerificationToken).toHaveBeenCalled();
            expect(auth_email_service_1.AuthEmail.sendConfirmationEmail).toHaveBeenCalled();
        });
        it("should throw if client already exists", async () => {
            Client_1.default.findOne.mockResolvedValue({});
            await expect(clientService.createClient({
                cedula: "123",
            }, "admin-id")).rejects.toThrow("Ya existe un cliente con esta cédula");
        });
    });
    // =====================================
    // GET CLIENT BY ID
    // =====================================
    describe("getClientById", () => {
        it("should return client", async () => {
            const leanMock = jest.fn().mockResolvedValue({
                _id: "1",
            });
            const populateMock = jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    lean: leanMock,
                }),
            });
            Client_1.default.findById.mockReturnValue({
                populate: populateMock,
            });
            const result = await clientService.getClientById("507f1f77bcf86cd799439011");
            expect(result).toBeDefined();
        });
    });
    // =====================================
    // UPDATE CLIENT
    // =====================================
    describe("updateClient", () => {
        it("should update client", async () => {
            const saveMock = jest.fn();
            Client_1.default.findById.mockResolvedValue({
                _id: "1",
                cedula: "old",
                email: "old@test.com",
                save: saveMock,
            });
            Client_1.default.findOne.mockResolvedValue(null);
            await clientService.updateClient("507f1f77bcf86cd799439011", {
                firstName: "Updated",
            });
            expect(saveMock).toHaveBeenCalled();
        });
    });
    // =====================================
    // DELETE CLIENT
    // =====================================
    describe("deleteClient", () => {
        it("should soft delete client", async () => {
            const saveMock = jest.fn();
            Client_1.default.findById.mockResolvedValue({
                isActive: true,
                save: saveMock,
            });
            const result = await clientService.deleteClient("507f1f77bcf86cd799439011");
            expect(saveMock).toHaveBeenCalled();
            expect(result).toEqual({
                message: "Cliente desactivado correctamente",
            });
        });
    });
    // =====================================
    // GET CLIENT CASES
    // =====================================
    describe("getClientCases", () => {
        it("should return cases", async () => {
            const leanMock = jest.fn().mockResolvedValue([]);
            const sortMock = jest.fn().mockReturnValue({
                lean: leanMock,
            });
            const populateStageMock = jest.fn().mockReturnValue({
                sort: sortMock,
            });
            const populateLawyerMock = jest.fn().mockReturnValue({
                populate: populateStageMock,
            });
            Case_1.default.find.mockReturnValue({
                populate: populateLawyerMock,
            });
            const result = await clientService.getClientCases("507f1f77bcf86cd799439011");
            expect(result).toEqual([]);
        });
    });
    // =====================================
    // GET CLIENT STATS
    // =====================================
    describe("getClientStats", () => {
        it("should return stats", async () => {
            Case_1.default.find.mockReturnValue({
                lean: jest.fn().mockResolvedValue([
                    {
                        status: cases_1.CASE_STATUS.ACTIVE,
                        financialSummary: {
                            totalPaid: 100,
                            pendingAmount: 50,
                        },
                    },
                    {
                        status: cases_1.CASE_STATUS.COMPLETED,
                        financialSummary: {
                            totalPaid: 200,
                            pendingAmount: 0,
                        },
                    },
                ]),
            });
            const result = await clientService.getClientStats("507f1f77bcf86cd799439011");
            expect(result).toEqual({
                totalCases: 2,
                activeCases: 1,
                completedCases: 1,
                totalPaid: 300,
                pendingAmount: 50,
            });
        });
    });
});
//# sourceMappingURL=clients.service.test.js.map