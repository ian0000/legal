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
exports.deleteCasePayment = exports.updateCasePayment = exports.getCasePaymentById = exports.getCasePayments = exports.createCasePayment = void 0;
const casePaymentsService = __importStar(require("./case-payments.service"));
const createCasePayment = async (req, res, next) => {
    try {
        const payment = await casePaymentsService.createCasePayment(req.user.id, req.body);
        res.status(201).json(payment);
    }
    catch (error) {
        next(error);
    }
};
exports.createCasePayment = createCasePayment;
const getCasePayments = async (req, res, next) => {
    try {
        const payments = await casePaymentsService.getCasePayments(req.params.caseId);
        res.status(200).json(payments);
    }
    catch (error) {
        next(error);
    }
};
exports.getCasePayments = getCasePayments;
const getCasePaymentById = async (req, res, next) => {
    try {
        const payment = await casePaymentsService.getCasePaymentById(req.params.paymentId);
        res.status(200).json(payment);
    }
    catch (error) {
        next(error);
    }
};
exports.getCasePaymentById = getCasePaymentById;
const updateCasePayment = async (req, res, next) => {
    try {
        const payment = await casePaymentsService.updateCasePayment(req.user.id, req.params.paymentId, req.body);
        res.status(200).json(payment);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCasePayment = updateCasePayment;
const deleteCasePayment = async (req, res, next) => {
    try {
        await casePaymentsService.deleteCasePayment(req.user.id, req.params.paymentId);
        res.status(200).json({
            message: "Pago eliminado correctamente",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCasePayment = deleteCasePayment;
//# sourceMappingURL=case-payments.controller.js.map