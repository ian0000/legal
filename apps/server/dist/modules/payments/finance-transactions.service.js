"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinanceDashboard = exports.deleteFinanceTransaction = exports.updateFinanceTransaction = exports.getFinanceTransactionById = exports.getFinanceTransactions = exports.createFinanceTransaction = void 0;
const FinanceTransaction_1 = __importDefault(require("../../models/FinanceTransaction"));
const Activities_1 = __importDefault(require("../../models/Activities"));
const CreateError_1 = require("../../utils/CreateError");
const createFinanceTransaction = async (userId, data) => {
    const transaction = await FinanceTransaction_1.default.create({
        ...data,
        registeredBy: userId,
    });
    await Activities_1.default.create({
        userId,
        action: "FINANCE_TRANSACTION_CREATED",
        description: "Se registró una transacción financiera",
    });
    return transaction;
};
exports.createFinanceTransaction = createFinanceTransaction;
const getFinanceTransactions = async (filters) => {
    const query = {
        isDeleted: false,
    };
    if (filters.type) {
        query.type = filters.type;
    }
    if (filters.category) {
        query.category = filters.category;
    }
    if (filters.status) {
        query.status = filters.status;
    }
    if (filters.startDate && filters.endDate) {
        query.transactionDate = {
            $gte: new Date(filters.startDate),
            $lte: new Date(filters.endDate),
        };
    }
    const page = Number(filters.page || 1);
    const limit = Number(filters.limit || 20);
    const skip = (page - 1) * limit;
    const data = await FinanceTransaction_1.default.find(query)
        .populate("registeredBy", "firstName lastName email")
        .sort({
        transactionDate: -1,
    })
        .skip(skip)
        .limit(limit);
    const total = await FinanceTransaction_1.default.countDocuments(query);
    return {
        data,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        },
    };
};
exports.getFinanceTransactions = getFinanceTransactions;
const getFinanceTransactionById = async (transactionId) => {
    const transaction = await FinanceTransaction_1.default.findOne({
        _id: transactionId,
        isDeleted: false,
    }).populate("registeredBy", "firstName lastName");
    if (!transaction) {
        throw (0, CreateError_1.CreateError)("Transacción no encontrada", 404);
    }
    return transaction;
};
exports.getFinanceTransactionById = getFinanceTransactionById;
const updateFinanceTransaction = async (userId, transactionId, data) => {
    const transaction = await FinanceTransaction_1.default.findOne({
        _id: transactionId,
        isDeleted: false,
    });
    if (!transaction) {
        throw (0, CreateError_1.CreateError)("Transacción no encontrada", 404);
    }
    Object.assign(transaction, data);
    transaction.updatedBy = userId;
    await transaction.save();
    await Activities_1.default.create({
        userId,
        action: "FINANCE_TRANSACTION_UPDATED",
        description: "Se actualizó una transacción financiera",
    });
    return transaction;
};
exports.updateFinanceTransaction = updateFinanceTransaction;
const deleteFinanceTransaction = async (userId, transactionId) => {
    const transaction = await FinanceTransaction_1.default.findOne({
        _id: transactionId,
        isDeleted: false,
    });
    if (!transaction) {
        throw (0, CreateError_1.CreateError)("Transacción no encontrada", 404);
    }
    transaction.isDeleted = true;
    transaction.deletedAt = new Date();
    transaction.deletedBy = userId;
    await transaction.save();
    await Activities_1.default.create({
        userId,
        action: "FINANCE_TRANSACTION_DELETED",
        description: "Se eliminó una transacción financiera",
    });
};
exports.deleteFinanceTransaction = deleteFinanceTransaction;
const getFinanceDashboard = async () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const transactions = await FinanceTransaction_1.default.find({
        isDeleted: false,
        status: "completed",
    });
    const monthlyTransactions = transactions.filter((t) => t.transactionDate >= startOfMonth);
    const monthlyIncome = monthlyTransactions
        .filter((t) => t.type === "income")
        .reduce((acc, curr) => acc + curr.amount, 0);
    const monthlyExpenses = monthlyTransactions
        .filter((t) => t.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0);
    return {
        monthlyIncome,
        monthlyExpenses,
        monthlyProfit: monthlyIncome - monthlyExpenses,
    };
};
exports.getFinanceDashboard = getFinanceDashboard;
//# sourceMappingURL=finance-transactions.service.js.map