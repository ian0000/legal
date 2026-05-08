// src/modules/cases/cases.controller.ts

import { NextFunction, Request, Response } from "express";

import * as casesService from "./cases.service";

// =====================================
// CREATE CASE
// =====================================

export const createCase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCase = await casesService.createCase({
      ...req.body,
      createdBy: req.user!.id,
    });

    res.status(201).json(newCase);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET CASES
// =====================================

export const getCases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cases = await casesService.getCases(req.query as any);

    res.status(200).json(cases);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET CASE BY ID
// =====================================

export const getCaseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const legalCase = await casesService.getCaseById(req.params.id as string);

    res.status(200).json(legalCase);
  } catch (error) {
    next(error);
  }
};

// =====================================
// UPDATE CASE
// =====================================

export const updateCase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCase = await casesService.updateCase(req.params.id as string, req.body);

    res.status(200).json(updatedCase);
  } catch (error) {
    next(error);
  }
};

// =====================================
// DELETE CASE
// =====================================

export const deleteCase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await casesService.deleteCase(req.params.id as string);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
