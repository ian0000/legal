import { Router } from "express";

import * as NotesController from "./notes.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Gestión de notas
 */

router.use(authenticate);

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

export default router;
