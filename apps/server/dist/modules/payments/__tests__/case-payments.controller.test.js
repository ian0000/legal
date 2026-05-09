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
const controller = __importStar(require("../case-payments.controller"));
const service = __importStar(require("../case-payments.service"));
jest.mock("../case-payments.service");
describe("Case Payments Controller", () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const next = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("createCasePayment", () => {
        it("should create payment", async () => {
            const req = {
                user: {
                    id: "user-1",
                },
                body: {
                    amount: 100,
                },
            };
            await controller.createCasePayment(req, res, next);
            expect(service.createCasePayment).toHaveBeenCalledWith("user-1", req.body);
            expect(res.status).toHaveBeenCalledWith(201);
        });
    });
    describe("getCasePayments", () => {
        it("should return payments", async () => {
            const req = {
                params: {
                    caseId: "case-1",
                },
            };
            await controller.getCasePayments(req, res, next);
            expect(service.getCasePayments).toHaveBeenCalledWith("case-1");
        });
    });
    describe("updateCasePayment", () => {
        it("should update payment", async () => {
            const req = {
                user: {
                    id: "user-1",
                },
                params: {
                    paymentId: "payment-1",
                },
                body: {
                    amount: 200,
                },
            };
            await controller.updateCasePayment(req, res, next);
            expect(service.updateCasePayment).toHaveBeenCalledWith("user-1", "payment-1", req.body);
        });
    });
    describe("deleteCasePayment", () => {
        it("should delete payment", async () => {
            const req = {
                user: {
                    id: "user-1",
                },
                params: {
                    paymentId: "payment-1",
                },
            };
            await controller.deleteCasePayment(req, res, next);
            expect(service.deleteCasePayment).toHaveBeenCalledWith("user-1", "payment-1");
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
//# sourceMappingURL=case-payments.controller.test.js.map