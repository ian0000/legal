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
const AuthController = __importStar(require("./auth.user.controller"));
const authenticate_1 = require("../../middlewares/authenticate");
const upload_1 = require("../../middlewares/upload");
const router = (0, express_1.Router)();
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
router.use(authenticate_1.authenticate);
router.put("/profile", AuthController.updateProfile);
router.put("/update-password", AuthController.updatePassword);
router.put("/profile-image", authenticate_1.authenticate, upload_1.upload.single("image"), AuthController.updateProfileImage);
exports.default = router;
//# sourceMappingURL=auth.user.routes.js.map