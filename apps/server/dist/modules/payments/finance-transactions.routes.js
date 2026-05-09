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
const FinanceTransactionsController = __importStar(require("./finance-transactions.controller"));
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Finance Transactions
 *   description: Gestión de transacciones financieras
 */
router.use(authenticate_1.authenticate);
/**
 * @swagger
 * /finance-transactions:
 *   post:
 *     summary: Crear una transacción financiera
 *     tags: [Finance Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFinanceTransactionDTO'
 *     responses:
 *       201:
 *         description: Transacción creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinanceTransactionResponse'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", FinanceTransactionsController.createFinanceTransaction);
/**
 * @swagger
 * /finance-transactions:
 *   get:
 *     summary: Obtener transacciones financieras
 *     tags: [Finance Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtrar por tipo
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtrar por estado
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *       - in: query
 *         name: relatedCaseId
 *         schema:
 *           type: string
 *         description: Filtrar por caso relacionado
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Cantidad de resultados
 *     responses:
 *       200:
 *         description: Lista de transacciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinanceTransactionListResponse'
 *       401:
 *         description: No autorizado
 */
router.get("/", FinanceTransactionsController.getFinanceTransactions);
/**
 * @swagger
 * /finance-transactions/{transactionId}:
 *   get:
 *     summary: Obtener transacción por ID
 *     tags: [Finance Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la transacción
 *     responses:
 *       200:
 *         description: Transacción obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinanceTransactionResponse'
 *       404:
 *         description: Transacción no encontrada
 *       401:
 *         description: No autorizado
 */
router.get("/:transactionId", FinanceTransactionsController.getFinanceTransactionById);
/**
 * @swagger
 * /finance-transactions/{transactionId}:
 *   put:
 *     summary: Actualizar transacción financiera
 *     tags: [Finance Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la transacción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFinanceTransactionDTO'
 *     responses:
 *       200:
 *         description: Transacción actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinanceTransactionResponse'
 *       404:
 *         description: Transacción no encontrada
 *       401:
 *         description: No autorizado
 */
router.put("/:transactionId", FinanceTransactionsController.updateFinanceTransaction);
/**
 * @swagger
 * /finance-transactions/{transactionId}:
 *   delete:
 *     summary: Eliminar transacción financiera
 *     tags: [Finance Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la transacción
 *     responses:
 *       200:
 *         description: Transacción eliminada correctamente
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
 *                   example: Transacción eliminada correctamente
 *       404:
 *         description: Transacción no encontrada
 *       401:
 *         description: No autorizado
 */
router.delete("/:transactionId", FinanceTransactionsController.deleteFinanceTransaction);
exports.default = router;
//# sourceMappingURL=finance-transactions.routes.js.map