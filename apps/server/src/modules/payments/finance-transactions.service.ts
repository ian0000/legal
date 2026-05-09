import FinanceTransaction from "../../models/FinanceTransaction";

import Activity from "../../models/Activities";

import { CreateError } from "../../utils/CreateError";

import type {
  CreateFinanceTransactionDTO,
  UpdateFinanceTransactionDTO,
} from "@legal/shared/src/schemas/finance-transactions.schema";

export const createFinanceTransaction = async (
  userId: string,
  data: CreateFinanceTransactionDTO,
) => {
  const transaction = await FinanceTransaction.create({
    ...data,
    registeredBy: userId,
  });

  await Activity.create({
    userId,
    action: "FINANCE_TRANSACTION_CREATED",
    description: "Se registró una transacción financiera",
  });

  return transaction;
};

export const getFinanceTransactions = async (filters: any) => {
  const query: any = {
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

  const data = await FinanceTransaction.find(query)
    .populate("registeredBy", "firstName lastName email")
    .sort({
      transactionDate: -1,
    })
    .skip(skip)
    .limit(limit);

  const total = await FinanceTransaction.countDocuments(query);

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

export const getFinanceTransactionById = async (transactionId: string) => {
  const transaction = await FinanceTransaction.findOne({
    _id: transactionId,
    isDeleted: false,
  }).populate("registeredBy", "firstName lastName");

  if (!transaction) {
    throw CreateError("Transacción no encontrada", 404);
  }

  return transaction;
};

export const updateFinanceTransaction = async (
  userId: string,
  transactionId: string,
  data: UpdateFinanceTransactionDTO,
) => {
  const transaction = await FinanceTransaction.findOne({
    _id: transactionId,
    isDeleted: false,
  });

  if (!transaction) {
    throw CreateError("Transacción no encontrada", 404);
  }

  Object.assign(transaction, data);

  transaction.updatedBy = userId as any;

  await transaction.save();

  await Activity.create({
    userId,
    action: "FINANCE_TRANSACTION_UPDATED",
    description: "Se actualizó una transacción financiera",
  });

  return transaction;
};

export const deleteFinanceTransaction = async (userId: string, transactionId: string) => {
  const transaction = await FinanceTransaction.findOne({
    _id: transactionId,
    isDeleted: false,
  });

  if (!transaction) {
    throw CreateError("Transacción no encontrada", 404);
  }

  transaction.isDeleted = true;

  transaction.deletedAt = new Date();

  transaction.deletedBy = userId as any;

  await transaction.save();

  await Activity.create({
    userId,
    action: "FINANCE_TRANSACTION_DELETED",
    description: "Se eliminó una transacción financiera",
  });
};

export const getFinanceDashboard = async () => {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const transactions = await FinanceTransaction.find({
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
