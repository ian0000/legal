import { Router } from "express";

import * as CasePaymentsController from "./case-payments.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.use(authenticate);

router.post("/", CasePaymentsController.createCasePayment);

router.get("/case/:caseId", CasePaymentsController.getCasePayments);

router.get("/:paymentId", CasePaymentsController.getCasePaymentById);

router.put("/:paymentId", CasePaymentsController.updateCasePayment);

router.delete("/:paymentId", CasePaymentsController.deleteCasePayment);

export default router;
