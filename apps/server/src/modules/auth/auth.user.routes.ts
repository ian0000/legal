import { Router } from "express";

import * as AuthController from "./auth.user.controller";

import { authenticate } from "../../middlewares/authenticate";
import { upload } from "../../middlewares/upload";
const router = Router();

/**
 * Public routes
 */

router.post("/create-account", AuthController.createAccount);

router.post("/setup-account", AuthController.setupAccount);

router.post("/login", AuthController.login);

router.post("/request-confirmation-code", AuthController.requestConfirmationCode);

router.post("/forgot-password", AuthController.forgotPassword);

router.post("/validate-token", AuthController.validateToken);

router.post("/update-password/:token", AuthController.updatePasswordWithToken);

/**
 * Protected routes
 */

router.use(authenticate);

router.put("/profile", AuthController.updateProfile);

router.put("/update-password", AuthController.updatePassword);

router.put(
  "/profile-image",
  authenticate,
  upload.single("image"),
  AuthController.updateProfileImage,
);

export default router;
