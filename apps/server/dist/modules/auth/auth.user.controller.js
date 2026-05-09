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
exports.getProfileImage = exports.updateProfileImage = exports.updatePassword = exports.updateProfile = exports.updatePasswordWithToken = exports.validateToken = exports.forgotPassword = exports.requestConfirmationCode = exports.login = exports.setupAccount = exports.createAccount = void 0;
const authService = __importStar(require("./auth.user.service"));
const AppError_1 = require("../../utils/AppError");
const createAccount = async (req, res, next) => {
    try {
        await authService.createAccount(req.body);
        res.status(201).json({
            message: "Cuenta creada exitosamente",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createAccount = createAccount;
const setupAccount = async (req, res, next) => {
    try {
        const { token, password } = req.body;
        await authService.setupAccount(token, password);
        res.status(200).json({
            message: "Cuenta activada correctamente",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.setupAccount = setupAccount;
const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body.email, req.body.password);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const requestConfirmationCode = async (req, res, next) => {
    try {
        await authService.requestConfirmationCode(req.body.email);
        res.status(200).json({
            message: "Correo de confirmación enviado",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.requestConfirmationCode = requestConfirmationCode;
const forgotPassword = async (req, res, next) => {
    try {
        await authService.forgotPassword(req.body.email);
        res.status(200).json({
            message: "Revisa tu correo para continuar",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPassword = forgotPassword;
const validateToken = async (req, res, next) => {
    try {
        const { token, type } = req.body;
        await authService.validateVerificationToken(token, type);
        res.status(200).json({
            message: "Token válido",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.validateToken = validateToken;
const updatePasswordWithToken = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        if (!token || typeof token !== "string") {
            throw new AppError_1.AppError("Token inválido", 400);
        }
        await authService.updatePasswordWithToken(token, password);
        res.status(200).json({
            message: "Contraseña actualizada correctamente",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePasswordWithToken = updatePasswordWithToken;
const updateProfile = async (req, res, next) => {
    try {
        const updatedUser = await authService.updateProfile(req.user.id, req.body);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
const updatePassword = async (req, res, next) => {
    try {
        await authService.updatePassword(req.user.id, req.body);
        res.status(200).json({
            message: "Contraseña actualizada correctamente",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePassword = updatePassword;
const updateProfileImage = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new AppError_1.AppError("Imagen requerida", 400);
        }
        const result = await authService.updateProfileImage(req.user.id, req.file);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfileImage = updateProfileImage;
const getProfileImage = async (req, res, next) => {
    try {
        const image = await authService.getProfileImage(req.params.userId);
        res.set("Content-Type", image.contentType);
        res.send(image.data);
    }
    catch (error) {
        next(error);
    }
};
exports.getProfileImage = getProfileImage;
//# sourceMappingURL=auth.user.controller.js.map