import { NextFunction, Request, Response } from "express";

import * as ActivitiesService from "./activities.service";

export const getActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await ActivitiesService.getActivities(req.query as any);

    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
};

export const getCaseActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await ActivitiesService.getCaseActivities(req.params.caseId as string);

    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await ActivitiesService.getActivityById(req.params.id as string);

    res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ActivitiesService.deleteActivity(req.params.id as string);

    res.status(200).json({
      message: "Actividad eliminada correctamente",
    });
  } catch (error) {
    next(error);
  }
};
