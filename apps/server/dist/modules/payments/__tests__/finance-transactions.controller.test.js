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
const controller = __importStar(require("../finance-transactions.controller"));
const service = __importStar(require("../finance-transactions.service"));
jest.mock("../finance-transactions.service");
describe("Finance Transactions Controller", () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const next = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("createFinanceTransaction", () => {
        it("should create transaction", async () => {
            const req = {
                user: {
                    id: "user-1",
                },
                body: {
                    title: "Internet",
                },
            };
            await controller.createFinanceTransaction(req, res, next);
            expect(service.createFinanceTransaction).toHaveBeenCalledWith("user-1", req.body);
            expect(res.status).toHaveBeenCalledWith(201);
        });
    });
    describe("getFinanceTransactions", () => {
        it("should return transactions", async () => {
            const req = {};
            await controller.getFinanceTransactions(req, res, next);
            expect(service.getFinanceTransactions).toHaveBeenCalled();
        });
    });
    describe("updateFinanceTransaction", () => {
        it("should update transaction", async () => {
            const req = {
                user: {
                    id: "user-1",
                },
                params: {
                    transactionId: "transaction-1",
                },
                body: {
                    amount: 100,
                },
            };
            await controller.updateFinanceTransaction(req, res, next);
            expect(service.updateFinanceTransaction).toHaveBeenCalledWith("user-1", "transaction-1", req.body);
        });
    });
    describe("deleteFinanceTransaction", () => {
        it("should delete transaction", async () => {
            const req = {
                user: {
                    id: "user-1",
                },
                params: {
                    transactionId: "transaction-1",
                },
            };
            await controller.deleteFinanceTransaction(req, res, next);
            expect(service.deleteFinanceTransaction).toHaveBeenCalledWith("user-1", "transaction-1");
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
//# sourceMappingURL=finance-transactions.controller.test.js.map