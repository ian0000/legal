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
const FinanceTransaction_1 = __importDefault(require("../../../models/FinanceTransaction"));
const Activities_1 = __importDefault(require("../../../models/Activities"));
const financeTransactionsService = __importStar(require("../finance-transactions.service"));
jest.mock("../../../models/FinanceTransaction");
jest.mock("../../../models/Activities");
describe("Finance Transactions Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("createFinanceTransaction", () => {
        it("should create transaction", async () => {
            FinanceTransaction_1.default.create.mockResolvedValue({
                _id: "transaction-1",
            });
            const result = await financeTransactionsService.createFinanceTransaction("user-1", {
                title: "Internet",
                amount: 50,
                type: "expense",
                category: "utilities",
            });
            expect(FinanceTransaction_1.default.create).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
    });
    describe("getFinanceTransactionById", () => {
        it("should return transaction", async () => {
            FinanceTransaction_1.default.findOne.mockReturnValue({
                populate: jest.fn().mockResolvedValue({
                    _id: "transaction-1",
                }),
            });
            const result = await financeTransactionsService.getFinanceTransactionById("transaction-1");
            expect(result).toBeDefined();
        });
    });
    describe("updateFinanceTransaction", () => {
        it("should update transaction", async () => {
            const saveMock = jest.fn();
            FinanceTransaction_1.default.findOne.mockResolvedValue({
                _id: "transaction-1",
                amount: 50,
                save: saveMock,
            });
            await financeTransactionsService.updateFinanceTransaction("user-1", "transaction-1", {
                amount: 100,
            });
            expect(saveMock).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
        });
    });
    describe("deleteFinanceTransaction", () => {
        it("should soft delete transaction", async () => {
            const saveMock = jest.fn();
            FinanceTransaction_1.default.findOne.mockResolvedValue({
                _id: "transaction-1",
                save: saveMock,
            });
            await financeTransactionsService.deleteFinanceTransaction("user-1", "transaction-1");
            expect(saveMock).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=finance-transactions.service.test.js.map