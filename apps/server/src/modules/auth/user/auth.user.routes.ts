import { Router } from "express";
import * as authController from "./auth.user.controller";
import { authorize } from "../../../middlewares/authorize";
import { USER_ROLES } from "@legal/shared/types/roles";
import { authenticate } from "../../../middlewares/authenticate";

const router = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Crear cuenta
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 example: juan@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Cuenta creada exitosamente
 */
router.post("/register", authController.createAccount);
/**
 * @swagger
 * /auth/confirm-account:
 *   post:
 *     summary: Confirmar cuenta con token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cuenta confirmada exitosamente
 */
router.post("/confirm-account", authController.confirmAccount);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post("/login", authController.login);
/**
 * @swagger
 * /auth/request-confirmation:
 *   post:
 *     summary: Solicitar nuevo código de confirmación
 *     tags: [Auth]
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
 *     responses:
 *       200:
 *         description: Correo enviado
 */
router.post("/request-confirmation", authController.requestConfirmationCode);
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     tags: [Auth]
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
 *     responses:
 *       200:
 *         description: Correo enviado
 */
router.post("/forgot-password", authController.forgotPassword);
/**
 * @swagger
 * /auth/validate-token:
 *   post:
 *     summary: Validar token de recuperación
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token válido
 */
router.post("/validate-token", authController.validateToken);
/**
 * @swagger
 * /auth/update-password/{token}:
 *   put:
 *     summary: Actualizar contraseña usando token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 */
router.put("/update-password/:token", authController.updatePasswordWithToken);
/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: Actualizar perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado
 */
router.put("/profile", authenticate, authController.updateProfile);
/**
 * @swagger
 * /auth/update-password:
 *   put:
 *     summary: Actualizar contraseña del usuario autenticado
 *     tags: [Auth]
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
router.put("/update-password", authenticate, authController.updatePassword);
/**
 * @swagger
 * /auth/users/{userId}:
 *   put:
 *     summary: Actualizar usuario (solo owner)
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       403:
 *         description: No autorizado
 */
router.put(
  "/users/:userId",
  authenticate,
  authorize(USER_ROLES.OWNER),
  authController.updateUserByOwner,
);

export default router;
