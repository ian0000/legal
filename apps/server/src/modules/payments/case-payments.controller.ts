import { NextFunction, Request, Response } from "express";

import * as casePaymentsService from "./case-payments.service";

export const createCasePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payment = await casePaymentsService.createCasePayment(req.user!.id, req.body);

    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};

export const getCasePayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payments = await casePaymentsService.getCasePayments(req.params.caseId as string);

    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

export const getCasePaymentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payment = await casePaymentsService.getCasePaymentById(req.params.paymentId as string);

    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

export const updateCasePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payment = await casePaymentsService.updateCasePayment(
      req.user!.id,
      req.params.paymentId as string,
      req.body,
    );

    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

export const deleteCasePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await casePaymentsService.deleteCasePayment(req.user!.id, req.params.paymentId as string);

    res.status(200).json({
      message: "Pago eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};
