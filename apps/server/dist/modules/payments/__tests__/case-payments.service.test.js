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
const CasePayment_1 = __importDefault(require("../../../models/CasePayment"));
const Case_1 = __importDefault(require("../../../models/Case"));
const Activities_1 = __importDefault(require("../../../models/Activities"));
const casePaymentsService = __importStar(require("../case-payments.service"));
jest.mock("../../../models/CasePayment");
jest.mock("../../../models/Case");
jest.mock("../../../models/FinanceTransaction");
jest.mock("../../../models/Activities");
describe("Case Payments Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("createCasePayment", () => {
        it("should create case payment", async () => {
            Case_1.default.findById.mockResolvedValue({
                _id: "case-1",
            });
            CasePayment_1.default.find.mockResolvedValue([]);
            const saveMock = jest.fn();
            CasePayment_1.default.create.mockResolvedValue({
                _id: "payment-1",
                caseId: "case-1",
                amount: 100,
                type: "income",
                category: "legal_fee",
                method: "cash",
                status: "completed",
                affectsGlobalFinance: false,
                save: saveMock,
            });
            Case_1.default.findById.mockResolvedValue({
                financialSummary: {
                    totalCost: 0,
                },
                save: saveMock,
            });
            const result = await casePaymentsService.createCasePayment("user-1", {
                caseId: "case-1",
                amount: 100,
                type: "income",
                category: "legal_fee",
                method: "cash",
            });
            expect(result).toBeDefined();
        });
    });
    describe("getCasePaymentById", () => {
        it("should return payment", async () => {
            CasePayment_1.default.findOne.mockReturnValue({
                populate: jest.fn().mockResolvedValue({
                    _id: "payment-1",
                }),
            });
            const result = await casePaymentsService.getCasePaymentById("payment-1");
            expect(result).toBeDefined();
        });
    });
    describe("updateCasePayment", () => {
        it("should update payment", async () => {
            const saveMock = jest.fn();
            CasePayment_1.default.findOne.mockResolvedValue({
                _id: "payment-1",
                amount: 100,
                type: "income",
                category: "legal_fee",
                method: "cash",
                status: "completed",
                caseId: "case-1",
                save: saveMock,
            });
            CasePayment_1.default.find.mockResolvedValue([]);
            Case_1.default.findById.mockResolvedValue({
                financialSummary: {
                    totalCost: 0,
                },
                save: saveMock,
            });
            await casePaymentsService.updateCasePayment("user-1", "payment-1", {
                amount: 200,
            });
            expect(saveMock).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
        });
    });
    describe("deleteCasePayment", () => {
        it("should soft delete payment", async () => {
            const saveMock = jest.fn();
            CasePayment_1.default.findOne.mockResolvedValue({
                _id: "payment-1",
                caseId: "case-1",
                save: saveMock,
            });
            CasePayment_1.default.find.mockResolvedValue([]);
            Case_1.default.findById.mockResolvedValue({
                financialSummary: {
                    totalCost: 0,
                },
                save: saveMock,
            });
            await casePaymentsService.deleteCasePayment("user-1", "payment-1");
            expect(saveMock).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=case-payments.service.test.js.map