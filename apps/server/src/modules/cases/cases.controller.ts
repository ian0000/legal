import { Request, Response, NextFunction } from "express";
import * as caseService from "../../modules/cases/cases.service";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: Types.ObjectId | string;
        role: string;
      };
    }
  }
}
export const createCase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await caseService.createCase(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllCases = async (_: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Fetching all cases");
    const cases = await caseService.getAllCases();
    res.json(cases);
  } catch (error) {
    next(error);
  }
};

export const getCaseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const caseId = req.params.id;

    if (typeof caseId !== "string") {
      throw new Error("Invalid case id");
    }
    const caseItem = await caseService.getCaseById(caseId);
    res.json(caseItem);
  } catch (error) {
    next(error);
  }
};

export const updateCase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const caseId = req.params.id;

    if (typeof caseId !== "string") {
      throw new Error("Invalid case id");
    }
    const userId = new Types.ObjectId(req.user.id);
    const updated = await caseService.updateCase(caseId, req.body, userId);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new Types.ObjectId(req.user.id);
    const { status } = req.body;
    const caseId = req.params.id;

    if (typeof caseId !== "string") {
      throw new Error("Invalid case id");
    }
    const updated = await caseService.updateStatus(caseId, status, userId);

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteCase = async (req: Request, res: Response, next: NextFunction) => {
  const caseId = req.params.id;

  if (typeof caseId !== "string") {
    throw new Error("Invalid case id");
  }
  try {
    await caseService.deleteCase(caseId);
    res.json({ message: "Case deleted" });
  } catch (error) {
    next(error);
  }
};
