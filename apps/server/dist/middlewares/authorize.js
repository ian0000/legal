"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const AppError_1 = require("../utils/AppError");
const authorize = (...allowedRoles) => (req, _res, next) => {
    if (!req.user) {
        return next(new AppError_1.AppError("No autenticado", 401));
    }
    if (!allowedRoles.includes(req.user.role)) {
        return next(new AppError_1.AppError("No autorizado", 403));
    }
    next();
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map