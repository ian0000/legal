import { Router } from "express";

import * as AuthController from "./auth.user.controller";

import { authenticate } from "../../middlewares/authenticate";
import { upload } from "../../middlewares/upload";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación y perfil de usuario
 */

/**
 * =========================================
 * Public routes
 * =========================================
 */

/**
 * @swagger
 * /auth/create-account:
 *   post:
 *     summary: Crear cuenta de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       201:
 *         description: Cuenta creada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/create-account", AuthController.createAccount);

/**
 * @swagger
 * /auth/setup-account:
 *   post:
 *     summary: Configurar cuenta de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - token
 *               - password
 *     responses:
 *       200:
 *         description: Cuenta configurada correctamente
 *       400:
 *         description: Token inválido
 */
router.post("/setup-account", AuthController.setupAccount);

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
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@email.com
 *               password:
 *                 type: string
 *                 example: Password123*
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /auth/request-confirmation-code:
 *   post:
 *     summary: Solicitar código de confirmación
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Código enviado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.post("/request-confirmation-code", AuthController.requestConfirmationCode);

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
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Correo de recuperación enviado
 *       404:
 *         description: Usuario no encontrado
 */
router.post("/forgot-password", AuthController.forgotPassword);

/**
 * @swagger
 * /auth/validate-token:
 *   post:
 *     summary: Validar token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: Token válido
 *       400:
 *         description: Token inválido o expirado
 */
router.post("/validate-token", AuthController.validateToken);

/**
 * @swagger
 * /auth/update-password/{token}:
 *   post:
 *     summary: Actualizar contraseña con token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de recuperación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Token inválido o expirado
 */
router.post("/update-password/:token", AuthController.updatePasswordWithToken);

/**
 * =========================================
 * Protected routes
 * =========================================
 */

router.use(authenticate);

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: Actualizar perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDTO'
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       401:
 *         description: No autorizado
 */
router.put("/profile", AuthController.updateProfile);

/**
 * @swagger
 * /auth/update-password:
 *   put:
 *     summary: Actualizar contraseña del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePasswordDTO'
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       401:
 *         description: No autorizado
 */
router.put("/update-password", AuthController.updatePassword);

/**
 * @swagger
 * /auth/profile-image:
 *   put:
 *     summary: Actualizar imagen de perfil
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen actualizada correctamente
 *       401:
 *         description: No autorizado
 */
router.put(
  "/profile-image",
  authenticate,
  upload.single("image"),
  AuthController.updateProfileImage,
);

export default router;
