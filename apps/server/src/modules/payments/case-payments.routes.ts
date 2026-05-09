import { Router } from "express";

import * as CasePaymentsController from "./case-payments.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Case Payments
 *   description: Gestión de pagos de casos
 */

router.use(authenticate);

/**
 * @swagger
 * /case-payments:
 *   post:
 *     summary: Crear un pago de caso
 *     tags: [Case Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCasePaymentDTO'
 *     responses:
 *       201:
 *         description: Pago creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CasePaymentResponse'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", CasePaymentsController.createCasePayment);

/**
 * @swagger
 * /case-payments/case/{caseId}:
 *   get:
 *     summary: Obtener pagos de un caso
 *     tags: [Case Payments]
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
 *         description: Lista de pagos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CasePaymentListResponse'
 *       404:
 *         description: Caso no encontrado
 *       401:
 *         description: No autorizado
 */
router.get("/case/:caseId", CasePaymentsController.getCasePayments);

/**
 * @swagger
 * /case-payments/{paymentId}:
 *   get:
 *     summary: Obtener pago por ID
 *     tags: [Case Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pago
 *     responses:
 *       200:
 *         description: Pago obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CasePaymentResponse'
 *       404:
 *         description: Pago no encontrado
 *       401:
 *         description: No autorizado
 */
router.get("/:paymentId", CasePaymentsController.getCasePaymentById);

/**
 * @swagger
 * /case-payments/{paymentId}:
 *   put:
 *     summary: Actualizar pago
 *     tags: [Case Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCasePaymentDTO'
 *     responses:
 *       200:
 *         description: Pago actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CasePaymentResponse'
 *       404:
 *         description: Pago no encontrado
 *       401:
 *         description: No autorizado
 */
router.put("/:paymentId", CasePaymentsController.updateCasePayment);

/**
 * @swagger
 * /case-payments/{paymentId}:
 *   delete:
 *     summary: Eliminar pago
 *     tags: [Case Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pago
 *     responses:
 *       200:
 *         description: Pago eliminado correctamente
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
 *                   example: Pago eliminado correctamente
 *       404:
 *         description: Pago no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete("/:paymentId", CasePaymentsController.deleteCasePayment);

export default router;
