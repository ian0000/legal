import { Router } from "express";

import * as CaseStagesController from "./stages.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Case Stages
 *   description: Gestión de etapas de casos
 */

router.use(authenticate);

// =====================================
// CASE STAGES
// =====================================

/**
 * @swagger
 * /cases/{caseId}/stages:
 *   post:
 *     summary: Crear una etapa para un caso
 *     tags: [Case Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: caseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCaseStageDTO'
 *     responses:
 *       201:
 *         description: Etapa creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CaseStageResponse'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/cases/:caseId/stages", CaseStagesController.createStage);

/**
 * @swagger
 * /cases/{caseId}/stages:
 *   get:
 *     summary: Obtener etapas de un caso
 *     tags: [Case Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: caseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del caso
 *     responses:
 *       200:
 *         description: Lista de etapas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CaseStageListResponse'
 *       404:
 *         description: Caso no encontrado
 *       401:
 *         description: No autorizado
 */
router.get("/cases/:caseId/stages", CaseStagesController.getCaseStages);

// =====================================
// SINGLE STAGE
// =====================================

/**
 * @swagger
 * /case-stages/{id}:
 *   get:
 *     summary: Obtener etapa por ID
 *     tags: [Case Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la etapa
 *     responses:
 *       200:
 *         description: Etapa obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CaseStageResponse'
 *       404:
 *         description: Etapa no encontrada
 *       401:
 *         description: No autorizado
 */
router.get("/case-stages/:id", CaseStagesController.getStageById);

/**
 * @swagger
 * /case-stages/{id}:
 *   put:
 *     summary: Actualizar etapa
 *     tags: [Case Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la etapa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCaseStageDTO'
 *     responses:
 *       200:
 *         description: Etapa actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CaseStageResponse'
 *       404:
 *         description: Etapa no encontrada
 *       401:
 *         description: No autorizado
 */
router.put("/case-stages/:id", CaseStagesController.updateStage);

/**
 * @swagger
 * /case-stages/{id}:
 *   delete:
 *     summary: Eliminar etapa
 *     tags: [Case Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la etapa
 *     responses:
 *       200:
 *         description: Etapa eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Etapa eliminada correctamente
 *       404:
 *         description: Etapa no encontrada
 *       401:
 *         description: No autorizado
 */
router.delete("/case-stages/:id", CaseStagesController.deleteStage);

// =====================================
// STATUS
// =====================================

/**
 * @swagger
 * /case-stages/{id}/status:
 *   patch:
 *     summary: Actualizar estado de etapa
 *     tags: [Case Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la etapa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCaseStageStatusDTO'
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StageStatusResponse'
 *       404:
 *         description: Etapa no encontrada
 *       401:
 *         description: No autorizado
 */
router.patch("/case-stages/:id/status", CaseStagesController.updateStageStatus);

// =====================================
// ASSIGN
// =====================================

/**
 * @swagger
 * /case-stages/{id}/assign:
 *   patch:
 *     summary: Asignar etapa a un usuario
 *     tags: [Case Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la etapa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignCaseStageDTO'
 *     responses:
 *       200:
 *         description: Etapa asignada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssignStageResponse'
 *       404:
 *         description: Etapa no encontrada
 *       401:
 *         description: No autorizado
 */
router.patch("/case-stages/:id/assign", CaseStagesController.assignStage);

// =====================================
// REORDER
// =====================================

/**
 * @swagger
 * /case-stages/{id}/reorder:
 *   patch:
 *     summary: Reordenar etapa
 *     tags: [Case Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la etapa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReorderCaseStageDTO'
 *     responses:
 *       200:
 *         description: Etapa reordenada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Etapa reordenada correctamente
 *                 stage:
 *                   $ref: '#/components/schemas/CaseStage'
 *       404:
 *         description: Etapa no encontrada
 *       401:
 *         description: No autorizado
 */
router.patch("/case-stages/:id/reorder", CaseStagesController.reorderStage);

export default router;
