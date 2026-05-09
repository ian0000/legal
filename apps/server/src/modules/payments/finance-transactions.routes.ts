import { Router } from "express";

import * as FinanceTransactionsController from "./finance-transactions.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.use(authenticate);

router.post("/", FinanceTransactionsController.createFinanceTransaction);

router.get("/", FinanceTransactionsController.getFinanceTransactions);

router.get("/:transactionId", FinanceTransactionsController.getFinanceTransactionById);

router.put("/:transactionId", FinanceTransactionsController.updateFinanceTransaction);

router.delete("/:transactionId", FinanceTransactionsController.deleteFinanceTransaction);

export default router;
