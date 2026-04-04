import { Router } from "express";
import * as caseController from "../cases/cases.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { USER_ROLES } from "@legal/shared/types/roles";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cases
 *   description: Gestión de casos
 */

/**
 * @swagger
 * /cases:
 *   post:
 *     summary: Crear un caso
 *     tags: [Cases]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - casenumber
 *               - name
 *               - description
 *               - casetype
 *               - estimatedHours
 *               - responsibleUser
 *               - client
 *               - dueDate
 *             properties:
 *               casenumber:
 *                 type: string
 *                 example: CASE-001
 *               name:
 *                 type: string
 *                 example: Demanda civil
 *               description:
 *                 type: string
 *               casetype:
 *                 type: string
 *                 enum: [civil, criminal, family, corporate]
 *               estimatedHours:
 *                 type: number
 *                 example: 10
 *               responsibleUser:
 *                 type: string
 *                 example: 69a4f900aae712ae4e6b62fa
 *               client:
 *                 type: string
 *                 example: 69d08231587aad8b6f822830
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Caso creado correctamente
 */
router.post(
  "/",
  authenticate,
  authorize(USER_ROLES.OWNER, USER_ROLES.LAWYER),
  caseController.createCase,
);

/**
 * @swagger
 * /cases:
 *   get:
 *     summary: Obtener todos los casos
 *     tags: [Cases]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de casos
 */
router.get("/", authenticate, caseController.getAllCases);

/**
 * @swagger
 * /cases/{id}:
 *   get:
 *     summary: Obtener caso por ID
 *     tags: [Cases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       404:
 *         description: Caso no encontrado
 */
router.get("/:id", authenticate, caseController.getCaseById);

/**
 * @swagger
 * /cases/{id}:
 *   put:
 *     summary: Actualizar un caso
 *     tags: [Cases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               casetype:
 *                 type: string
 *               estimatedHours:
 *                 type: number
 *               actualHours:
 *                 type: number
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Caso actualizado
 */
router.put(
  "/:id",
  authenticate,
  authorize(USER_ROLES.OWNER, USER_ROLES.LAWYER),
  caseController.updateCase,
);

/**
 * @swagger
 * /cases/{id}/status:
 *   patch:
 *     summary: Cambiar estado del caso
 *     tags: [Cases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *                 example: completed
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch(
  "/:id/status",
  authenticate,
  authorize(USER_ROLES.OWNER, USER_ROLES.LAWYER),
  caseController.updateStatus,
);

/**
 * @swagger
 * /cases/{id}:
 *   delete:
 *     summary: Eliminar un caso
 *     tags: [Cases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso eliminado
 */
router.delete("/:id", authenticate, authorize(USER_ROLES.OWNER), caseController.deleteCase);

export default router;
