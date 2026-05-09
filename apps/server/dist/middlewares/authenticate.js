"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const env_1 = require("../config/env");
const AppError_1 = require("../utils/AppError");
const authenticate = async (req, _res, next) => {
    try {
        const bearer = req.headers.authorization;
        if (!bearer?.startsWith("Bearer ")) {
            throw new AppError_1.AppError("No autenticado", 401);
        }
        const token = bearer.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        const user = await User_1.default.findById(decoded.id);
        if (!user) {
            throw new AppError_1.AppError("Usuario no encontrado", 404);
        }
        req.user = {
            id: user._id.toString(),
            role: user.role,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map