import { NextFunction, Request, Response } from "express";

import * as financeTransactionsService from "./finance-transactions.service";

export const createFinanceTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await financeTransactionsService.createFinanceTransaction(
      req.user!.id,
      req.body,
    );

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const getFinanceTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await financeTransactionsService.getFinanceTransactions(req.query);

    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getFinanceTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const transaction = await financeTransactionsService.getFinanceTransactionById(
      req.params.transactionId as string,
    );

    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const updateFinanceTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await financeTransactionsService.updateFinanceTransaction(
      req.user!.id,
      req.params.transactionId as string,
      req.body,
    );

    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const deleteFinanceTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await financeTransactionsService.deleteFinanceTransaction(
      req.user!.id,
      req.params.transactionId as string,
    );

    res.status(200).json({
      message: "Transacción eliminada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export const getFinanceDashboard = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const dashboard = await financeTransactionsService.getFinanceDashboard();

    res.status(200).json(dashboard);
  } catch (error) {
    next(error);
  }
};
