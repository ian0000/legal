import { Router } from "express";

import * as DocumentsController from "./documents.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Gestión de documentos
 */

router.use(authenticate);

// =====================================
// DOCUMENTS
// =====================================

/**
 * @swagger
 * /documents:
 *   post:
 *     summary: Crear un documento
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDocumentDTO'
 *     responses:
 *       201:
 *         description: Documento creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Document'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", DocumentsController.createDocument);

/**
 * @swagger
 * /documents/case/{caseId}:
 *   get:
 *     summary: Obtener documentos de un caso
 *     tags: [Documents]
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
 *         description: Lista de documentos obtenida correctamente
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
 *                     $ref: '#/components/schemas/Document'
 *       404:
 *         description: Caso no encontrado
 *       401:
 *         description: No autorizado
 */
router.get("/case/:caseId", DocumentsController.getCaseDocuments);

/**
 * @swagger
 * /documents/{documentId}:
 *   get:
 *     summary: Obtener documento por ID
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del documento
 *     responses:
 *       200:
 *         description: Documento obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Document'
 *       404:
 *         description: Documento no encontrado
 *       401:
 *         description: No autorizado
 */
router.get("/:documentId", DocumentsController.getDocumentById);

/**
 * @swagger
 * /documents/{documentId}:
 *   put:
 *     summary: Actualizar documento
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del documento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDocumentDTO'
 *     responses:
 *       200:
 *         description: Documento actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Document'
 *       404:
 *         description: Documento no encontrado
 *       401:
 *         description: No autorizado
 */
router.put("/:documentId", DocumentsController.updateDocument);

/**
 * @swagger
 * /documents/{documentId}:
 *   delete:
 *     summary: Eliminar documento
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del documento
 *     responses:
 *       200:
 *         description: Documento eliminado correctamente
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
 *                   example: Documento eliminado correctamente
 *       404:
 *         description: Documento no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete("/:documentId", DocumentsController.deleteDocument);

export default router;
