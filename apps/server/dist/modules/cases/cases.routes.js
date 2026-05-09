"use strict";
// src/modules/cases/cases.routes.ts
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
const CasesController = __importStar(require("./cases.controller"));
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Cases
 *   description: Gestión de casos legales
 */
router.use(authenticate_1.authenticate);
/**
 * @swagger
 * /cases:
 *   post:
 *     summary: Crear un nuevo caso
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCaseDTO'
 *     responses:
 *       201:
 *         description: Caso creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Case'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", CasesController.createCase);
/**
 * @swagger
 * /cases:
 *   get:
 *     summary: Obtener todos los casos
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtrar por estado
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         description: Filtrar por cliente
 *       - in: query
 *         name: principalLawyerId
 *         schema:
 *           type: string
 *         description: Filtrar por abogado principal
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Filtrar por prioridad
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Búsqueda general
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de resultados
 *     responses:
 *       200:
 *         description: Lista de casos obtenida correctamente
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
 *                     $ref: '#/components/schemas/Case'
 *       401:
 *         description: No autorizado
 */
router.get("/", CasesController.getCases);
/**
 * @swagger
 * /cases/{id}:
 *   get:
 *     summary: Obtener un caso por ID
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del caso
 *     responses:
 *       200:
 *         description: Caso obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Case'
 *       404:
 *         description: Caso no encontrado
 *       401:
 *         description: No autorizado
 */
router.get("/:id", CasesController.getCaseById);
/**
 * @swagger
 * /cases/{id}:
 *   put:
 *     summary: Actualizar un caso
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCaseDTO'
 *     responses:
 *       200:
 *         description: Caso actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Case'
 *       404:
 *         description: Caso no encontrado
 *       401:
 *         description: No autorizado
 */
router.put("/:id", CasesController.updateCase);
/**
 * @swagger
 * /cases/{id}:
 *   delete:
 *     summary: Eliminar un caso
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del caso
 *     responses:
 *       200:
 *         description: Caso eliminado correctamente
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
 *                   example: Caso eliminado correctamente
 *       404:
 *         description: Caso no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete("/:id", CasesController.deleteCase);
exports.default = router;
//# sourceMappingURL=cases.routes.js.map