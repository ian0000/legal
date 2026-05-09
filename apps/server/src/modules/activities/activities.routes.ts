import { Router } from "express";

import * as ActivitiesController from "./activities.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Gestión de actividades del sistema
 */

router.use(authenticate);

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Obtener todas las actividades
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de resultados por página
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filtrar por usuario
 *       - in: query
 *         name: caseId
 *         schema:
 *           type: string
 *         description: Filtrar por caso
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Filtrar por acción
 *     responses:
 *       200:
 *         description: Lista de actividades obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Activity'
 *       401:
 *         description: No autorizado
 */
router.get("/", ActivitiesController.getActivities);

/**
 * @swagger
 * /activities/case/{caseId}:
 *   get:
 *     summary: Obtener actividades de un caso
 *     tags: [Activities]
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
 *         description: Actividades del caso obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Caso no encontrado
 *       401:
 *         description: No autorizado
 */
router.get("/case/:caseId", ActivitiesController.getCaseActivities);

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     summary: Obtener una actividad por ID
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la actividad
 *     responses:
 *       200:
 *         description: Actividad obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Actividad no encontrada
 *       401:
 *         description: No autorizado
 */
router.get("/:id", ActivitiesController.getActivityById);

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     summary: Eliminar una actividad
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la actividad
 *     responses:
 *       200:
 *         description: Actividad eliminada correctamente
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
 *                   example: Actividad eliminada correctamente
 *       404:
 *         description: Actividad no encontrada
 *       401:
 *         description: No autorizado
 */
router.delete("/:id", ActivitiesController.deleteActivity);

export default router;
