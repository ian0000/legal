import { Router } from "express";

import * as CaseStagesController from "./stages.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.use(authenticate);

// =====================================
// CASE STAGES
// =====================================

router.post("/cases/:caseId/stages", CaseStagesController.createStage);

router.get("/cases/:caseId/stages", CaseStagesController.getCaseStages);

// =====================================
// SINGLE STAGE
// =====================================

router.get("/case-stages/:id", CaseStagesController.getStageById);

router.put("/case-stages/:id", CaseStagesController.updateStage);

router.delete("/case-stages/:id", CaseStagesController.deleteStage);

// =====================================
// STATUS
// =====================================

router.patch("/case-stages/:id/status", CaseStagesController.updateStageStatus);

// =====================================
// ASSIGN
// =====================================

router.patch("/case-stages/:id/assign", CaseStagesController.assignStage);

// =====================================
// REORDER
// =====================================

router.patch("/case-stages/:id/reorder", CaseStagesController.reorderStage);

export default router;
