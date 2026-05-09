"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CasePaymentsController = __importStar(require("./case-payments.controller"));
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Case Payments
 *   description: Gestión de pagos de casos
 */
router.use(authenticate_1.authenticate);
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
exports.default = router;
//# sourceMappingURL=case-payments.routes.js.map