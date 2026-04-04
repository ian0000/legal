import { Router } from "express";
import * as clientController from "../clients/clients.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { USER_ROLES } from "@legal/shared/types/roles";

const router = Router();

/**
 * @swagger
 * /client:
 *   post:
 *     summary: Crear cliente (solo admin o lawyer)
 *     tags: [Client]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, nationalId]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 example: juan@email.com
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               nationalId:
 *                 type: string
 *                 example: 1234567890
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 */
router.post(
  "/",
  authenticate,
  authorize(USER_ROLES.OWNER, USER_ROLES.LAWYER),
  clientController.createClient,
);

/**
 * @swagger
 * /client/request-access:
 *   post:
 *     summary: Solicitar acceso (envía clave temporal al correo)
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan@email.com
 *     responses:
 *       200:
 *         description: Clave enviada al correo
 */
router.post("/request-access", clientController.requestAccess);

/**
 * @swagger
 * /client/login:
 *   post:
 *     summary: Iniciar sesión cliente
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Retorna JWT
 */
router.post("/login", clientController.login);

/**
 * @swagger
 * /client/profile:
 *   get:
 *     summary: Obtener perfil del cliente autenticado
 *     tags: [Client]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del cliente
 */
router.get("/profile", authenticate, clientController.getProfile);

/**
 * @swagger
 * /client/profile:
 *   put:
 *     summary: Actualizar perfil del cliente
 *     tags: [Client]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado
 */
router.put("/profile", authenticate, clientController.updateProfile);

/**
 * @swagger
 * /client/change-password:
 *   put:
 *     summary: Cambiar contraseña del cliente
 *     tags: [Client]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 */
router.put("/change-password", authenticate, clientController.changePassword);

/**
 * @swagger
 * /client/cases/{nationalId}:
 *   get:
 *     summary: Consultar casos por cédula (sin login)
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: nationalId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de casos del cliente
 */
router.get("/cases/:nationalId", clientController.getCases);

export default router;
