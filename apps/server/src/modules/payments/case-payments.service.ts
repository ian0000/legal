import CasePayment from "../../models/CasePayment";
import Case from "../../models/Case";
import Activity from "../../models/Activities";

import { CreateError } from "../../utils/CreateError";

import FinanceTransaction from "../../models/FinanceTransaction";
import type {
  CreateCasePaymentDTO,
  UpdateCasePaymentDTO,
} from "@legal/shared/src/schemas/case-payments.schema";

const recalculateCaseFinancialSummary = async (caseId: string) => {
  const payments = await CasePayment.find({
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

  const legalCase = await Case.findById(caseId);

  if (!legalCase) {
    return;
  }

  legalCase.financialSummary.totalPaid = totalIncome;

  legalCase.financialSummary.expenses = totalExpenses;

  legalCase.financialSummary.pendingAmount = legalCase.financialSummary.totalCost - totalIncome;

  await legalCase.save();
};

export const createCasePayment = async (userId: string, data: CreateCasePaymentDTO) => {
  const legalCase = await Case.findById(data.caseId);

  if (!legalCase) {
    throw CreateError("Caso no encontrado", 404);
  }

  const payment = await CasePayment.create({
    ...data,
    registeredBy: userId,
  });

  if (payment.affectsGlobalFinance) {
    const financeTransaction = await FinanceTransaction.create({
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

  await Activity.create({
    userId,
    caseId: data.caseId,
    action: "CASE_PAYMENT_CREATED",
    description: "Se registró un pago en el caso",
  });

  return payment;
};

export const getCasePayments = async (caseId: string) => {
  return await CasePayment.find({
    caseId,
    isDeleted: false,
  })
    .populate("registeredBy", "firstName lastName email")
    .sort({
      paymentDate: -1,
    });
};

export const getCasePaymentById = async (paymentId: string) => {
  const payment = await CasePayment.findOne({
    _id: paymentId,
    isDeleted: false,
  }).populate("registeredBy", "firstName lastName");

  if (!payment) {
    throw CreateError("Pago no encontrado", 404);
  }

  return payment;
};

export const updateCasePayment = async (
  userId: string,
  paymentId: string,
  data: UpdateCasePaymentDTO,
) => {
  const payment = await CasePayment.findOne({
    _id: paymentId,
    isDeleted: false,
  });

  if (!payment) {
    throw CreateError("Pago no encontrado", 404);
  }

  Object.assign(payment, data);

  await payment.save();

  if (payment.financeTransactionId) {
    await FinanceTransaction.findByIdAndUpdate(payment.financeTransactionId, {
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

  await Activity.create({
    userId,
    caseId: payment.caseId,
    action: "CASE_PAYMENT_UPDATED",
    description: "Se actualizó un pago",
  });

  return payment;
};

export const deleteCasePayment = async (userId: string, paymentId: string) => {
  const payment = await CasePayment.findOne({
    _id: paymentId,
    isDeleted: false,
  });

  if (!payment) {
    throw CreateError("Pago no encontrado", 404);
  }

  payment.isDeleted = true;

  payment.deletedAt = new Date();

  await payment.save();

  if (payment.financeTransactionId) {
    await FinanceTransaction.findByIdAndUpdate(payment.financeTransactionId, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }

  await recalculateCaseFinancialSummary(payment.caseId.toString());

  await Activity.create({
    userId,
    caseId: payment.caseId,
    action: "CASE_PAYMENT_DELETED",
    description: "Se eliminó un pago",
  });
};
