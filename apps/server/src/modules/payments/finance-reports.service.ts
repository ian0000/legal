import { Router } from "express";

import * as FinanceTransactionsController from "./finance-transactions.controller";

import { authenticate } from "../../middlewares/authenticate";

import { authorize } from "../../middlewares/authorize";

import { USER_ROLES } from "@legal/shared/src/types/roles";

const router = Router();

router.use(authenticate, authorize(USER_ROLES.OWNER));

router.get("/dashboard", FinanceTransactionsController.getFinanceDashboard);

router.post("/", FinanceTransactionsController.createFinanceTransaction);

router.get("/", FinanceTransactionsController.getFinanceTransactions);

router.get("/:transactionId", FinanceTransactionsController.getFinanceTransactionById);

router.put("/:transactionId", FinanceTransactionsController.updateFinanceTransaction);

router.delete("/:transactionId", FinanceTransactionsController.deleteFinanceTransaction);

export default router;
