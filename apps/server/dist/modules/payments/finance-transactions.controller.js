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
exports.getFinanceDashboard = exports.deleteFinanceTransaction = exports.updateFinanceTransaction = exports.getFinanceTransactionById = exports.getFinanceTransactions = exports.createFinanceTransaction = void 0;
const financeTransactionsService = __importStar(require("./finance-transactions.service"));
const createFinanceTransaction = async (req, res, next) => {
    try {
        const transaction = await financeTransactionsService.createFinanceTransaction(req.user.id, req.body);
        res.status(201).json(transaction);
    }
    catch (error) {
        next(error);
    }
};
exports.createFinanceTransaction = createFinanceTransaction;
const getFinanceTransactions = async (req, res, next) => {
    try {
        const transactions = await financeTransactionsService.getFinanceTransactions(req.query);
        res.status(200).json(transactions);
    }
    catch (error) {
        next(error);
    }
};
exports.getFinanceTransactions = getFinanceTransactions;
const getFinanceTransactionById = async (req, res, next) => {
    try {
        const transaction = await financeTransactionsService.getFinanceTransactionById(req.params.transactionId);
        res.status(200).json(transaction);
    }
    catch (error) {
        next(error);
    }
};
exports.getFinanceTransactionById = getFinanceTransactionById;
const updateFinanceTransaction = async (req, res, next) => {
    try {
        const transaction = await financeTransactionsService.updateFinanceTransaction(req.user.id, req.params.transactionId, req.body);
        res.status(200).json(transaction);
    }
    catch (error) {
        next(error);
    }
};
exports.updateFinanceTransaction = updateFinanceTransaction;
const deleteFinanceTransaction = async (req, res, next) => {
    try {
        await financeTransactionsService.deleteFinanceTransaction(req.user.id, req.params.transactionId);
        res.status(200).json({
            message: "Transacción eliminada correctamente",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteFinanceTransaction = deleteFinanceTransaction;
const getFinanceDashboard = async (_req, res, next) => {
    try {
        const dashboard = await financeTransactionsService.getFinanceDashboard();
        res.status(200).json(dashboard);
    }
    catch (error) {
        next(error);
    }
};
exports.getFinanceDashboard = getFinanceDashboard;
//# sourceMappingURL=finance-transactions.controller.js.map