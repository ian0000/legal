import { Router } from "express";

import * as ClientController from "./clients.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

/**
 * Protected routes
 */

router.use(authenticate);

/**
 * Clients
 */

router.post("/", ClientController.createClient);

router.get("/", ClientController.getClients);

router.get("/:id", ClientController.getClientById);

router.put("/:id", ClientController.updateClient);

router.delete("/:id", ClientController.deleteClient);

/**
 * Client cases
 */

router.get("/:id/cases", ClientController.getClientCases);

/**
 * Client stats
 */

router.get("/:id/stats", ClientController.getClientStats);

export default router;
