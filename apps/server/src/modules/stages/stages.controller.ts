import { NextFunction, Request, Response } from "express";

import * as CaseStagesService from "./stages.service";

// =====================================
// CREATE
// =====================================

export const createStage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stage = await CaseStagesService.createStage(req.user!.id, {
      ...req.body,
      caseId: req.params.caseId,
    });

    res.status(201).json(stage);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET ALL
// =====================================

export const getCaseStages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stages = await CaseStagesService.getCaseStages(req.params.caseId as string);

    res.status(200).json(stages);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET ONE
// =====================================

export const getStageById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stage = await CaseStagesService.getStageById(req.params.id as string);

    res.status(200).json(stage);
  } catch (error) {
    next(error);
  }
};

// =====================================
// UPDATE
// =====================================

export const updateStage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stage = await CaseStagesService.updateStage(req.params.id as string, req.body);

    res.status(200).json(stage);
  } catch (error) {
    next(error);
  }
};

// =====================================
// DELETE
// =====================================

export const deleteStage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CaseStagesService.deleteStage(req.params.id as string);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =====================================
// UPDATE STATUS
// =====================================

export const updateStageStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stage = await CaseStagesService.updateStageStatus(
      req.user!.id,
      req.params.id as string,
      req.body,
    );

    res.status(200).json(stage);
  } catch (error) {
    next(error);
  }
};

// =====================================
// ASSIGN
// =====================================

export const assignStage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stage = await CaseStagesService.assignStage(
      req.user!.id,
      req.params.id as string,
      req.body,
    );

    res.status(200).json(stage);
  } catch (error) {
    next(error);
  }
};

// =====================================
// REORDER
// =====================================

export const reorderStage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stage = await CaseStagesService.reorderStage(req.params.id as string, req.body);

    res.status(200).json(stage);
  } catch (error) {
    next(error);
  }
};
