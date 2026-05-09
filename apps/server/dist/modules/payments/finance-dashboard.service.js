"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFinanceDashboard = void 0;
const FinanceTransaction_1 = __importDefault(require("../../models/FinanceTransaction"));
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
//# sourceMappingURL=finance-dashboard.service.js.map