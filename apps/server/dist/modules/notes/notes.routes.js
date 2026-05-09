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
const NotesController = __importStar(require("./notes.controller"));
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Gestión de notas
 */
router.use(authenticate_1.authenticate);
// =====================================
// NOTES
// =====================================
/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Crear una nota
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteDTO'
 *     responses:
 *       201:
 *         description: Nota creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteResponse'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", NotesController.createNote);
/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Obtener notas
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: caseId
 *         schema:
 *           type: string
 *         description: Filtrar por caso
 *       - in: query
 *         name: stageId
 *         schema:
 *           type: string
 *         description: Filtrar por etapa
 *       - in: query
 *         name: visibleToClient
 *         schema:
 *           type: boolean
 *         description: Filtrar por visibilidad para cliente
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
 *         description: Lista de notas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteListResponse'
 *       401:
 *         description: No autorizado
 */
router.get("/", NotesController.getNotes);
/**
 * @swagger
 * /notes/{noteId}:
 *   get:
 *     summary: Obtener nota por ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la nota
 *     responses:
 *       200:
 *         description: Nota obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteResponse'
 *       404:
 *         description: Nota no encontrada
 *       401:
 *         description: No autorizado
 */
router.get("/:noteId", NotesController.getNoteById);
/**
 * @swagger
 * /notes/{noteId}:
 *   put:
 *     summary: Actualizar nota
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNoteDTO'
 *     responses:
 *       200:
 *         description: Nota actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteResponse'
 *       404:
 *         description: Nota no encontrada
 *       401:
 *         description: No autorizado
 */
router.put("/:noteId", NotesController.updateNote);
/**
 * @swagger
 * /notes/{noteId}:
 *   delete:
 *     summary: Eliminar nota
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la nota
 *     responses:
 *       200:
 *         description: Nota eliminada correctamente
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
 *                   example: Nota eliminada correctamente
 *       404:
 *         description: Nota no encontrada
 *       401:
 *         description: No autorizado
 */
router.delete("/:noteId", NotesController.deleteNote);
exports.default = router;
//# sourceMappingURL=notes.routes.js.map