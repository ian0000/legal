// src/modules/cases/cases.routes.ts

import { Router } from "express";

import * as CasesController from "./cases.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.use(authenticate);

router.post("/", CasesController.createCase);

router.get("/", CasesController.getCases);

router.get("/:id", CasesController.getCaseById);

router.put("/:id", CasesController.updateCase);

router.delete("/:id", CasesController.deleteCase);

export default router;
