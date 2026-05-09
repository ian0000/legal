"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCasePayment = exports.updateCasePayment = exports.getCasePaymentById = exports.getCasePayments = exports.createCasePayment = void 0;
const CasePayment_1 = __importDefault(require("../../models/CasePayment"));
const Case_1 = __importDefault(require("../../models/Case"));
const Activities_1 = __importDefault(require("../../models/Activities"));
const CreateError_1 = require("../../utils/CreateError");
const FinanceTransaction_1 = __importDefault(require("../../models/FinanceTransaction"));
const recalculateCaseFinancialSummary = async (caseId) => {
    const payments = await CasePayment_1.default.find({
        caseId,
        isDeleted: false,
        status: "completed",
    });
    const totalIncome = payments
        .filter((p) => p.type === "income")
        .reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = payments
        .filter((p) => p.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0);
    const legalCase = await Case_1.default.findById(caseId);
    if (!legalCase) {
        return;
    }
    legalCase.financialSummary.totalPaid = totalIncome;
    legalCase.financialSummary.expenses = totalExpenses;
    legalCase.financialSummary.pendingAmount = legalCase.financialSummary.totalCost - totalIncome;
    await legalCase.save();
};
const createCasePayment = async (userId, data) => {
    const legalCase = await Case_1.default.findById(data.caseId);
    if (!legalCase) {
        throw (0, CreateError_1.CreateError)("Caso no encontrado", 404);
    }
    const payment = await CasePayment_1.default.create({
        ...data,
        registeredBy: userId,
    });
    if (payment.affectsGlobalFinance) {
        const financeTransaction = await FinanceTransaction_1.default.create({
            title: payment.type === "income" ? "Ingreso desde caso" : "Gasto desde caso",
            description: payment.description,
            amount: payment.amount,
            type: payment.type,
            category: payment.category,
            method: payment.method,
            status: payment.status,
            reference: payment.reference,
            transactionDate: payment.paymentDate,
            registeredBy: userId,
            relatedCaseId: payment.caseId,
            sourceType: "case_payment",
        });
        payment.financeTransactionId = financeTransaction._id;
        await payment.save();
    }
    await recalculateCaseFinancialSummary(data.caseId);
    await Activities_1.default.create({
        userId,
        caseId: data.caseId,
        action: "CASE_PAYMENT_CREATED",
        description: "Se registró un pago en el caso",
    });
    return payment;
};
exports.createCasePayment = createCasePayment;
const getCasePayments = async (caseId) => {
    return await CasePayment_1.default.find({
        caseId,
        isDeleted: false,
    })
        .populate("registeredBy", "firstName lastName email")
        .sort({
        paymentDate: -1,
    });
};
exports.getCasePayments = getCasePayments;
const getCasePaymentById = async (paymentId) => {
    const payment = await CasePayment_1.default.findOne({
        _id: paymentId,
        isDeleted: false,
    }).populate("registeredBy", "firstName lastName");
    if (!payment) {
        throw (0, CreateError_1.CreateError)("Pago no encontrado", 404);
    }
    return payment;
};
exports.getCasePaymentById = getCasePaymentById;
const updateCasePayment = async (userId, paymentId, data) => {
    const payment = await CasePayment_1.default.findOne({
        _id: paymentId,
        isDeleted: false,
    });
    if (!payment) {
        throw (0, CreateError_1.CreateError)("Pago no encontrado", 404);
    }
    Object.assign(payment, data);
    await payment.save();
    if (payment.financeTransactionId) {
        await FinanceTransaction_1.default.findByIdAndUpdate(payment.financeTransactionId, {
            amount: payment.amount,
            type: payment.type,
            category: payment.category,
            method: payment.method,
            status: payment.status,
            description: payment.description,
            reference: payment.reference,
            transactionDate: payment.paymentDate,
        });
    }
    await recalculateCaseFinancialSummary(payment.caseId.toString());
    await Activities_1.default.create({
        userId,
        caseId: payment.caseId,
        action: "CASE_PAYMENT_UPDATED",
        description: "Se actualizó un pago",
    });
    return payment;
};
exports.updateCasePayment = updateCasePayment;
const deleteCasePayment = async (userId, paymentId) => {
    const payment = await CasePayment_1.default.findOne({
        _id: paymentId,
        isDeleted: false,
    });
    if (!payment) {
        throw (0, CreateError_1.CreateError)("Pago no encontrado", 404);
    }
    payment.isDeleted = true;
    payment.deletedAt = new Date();
    await payment.save();
    if (payment.financeTransactionId) {
        await FinanceTransaction_1.default.findByIdAndUpdate(payment.financeTransactionId, {
            isDeleted: true,
            deletedAt: new Date(),
        });
    }
    await recalculateCaseFinancialSummary(payment.caseId.toString());
    await Activities_1.default.create({
        userId,
        caseId: payment.caseId,
        action: "CASE_PAYMENT_DELETED",
        description: "Se eliminó un pago",
    });
};
exports.deleteCasePayment = deleteCasePayment;
//# sourceMappingURL=case-payments.service.js.map