import { Router } from "express";

import * as ActivitiesController from "./activities.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.use(authenticate);

router.get("/", ActivitiesController.getActivities);

router.get("/case/:caseId", ActivitiesController.getCaseActivities);

router.get("/:id", ActivitiesController.getActivityById);

router.delete("/:id", ActivitiesController.deleteActivity);

export default router;
