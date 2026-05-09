"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermission = void 0;
const permissions_1 = require("@/config/permissions");
const authorizePermission = (permission) => {
    return (req, res, next) => {
        if (!req.role) {
            return res.status(401).json({ message: "No autenticado" });
        }
        const allowedRoles = permissions_1.PERMISSIONS[permission];
        if (!allowedRoles.includes(req.role)) {
            return res.status(403).json({ message: "No autorizado" });
        }
        next();
    };
};
exports.authorizePermission = authorizePermission;
//# sourceMappingURL=authorizePermission.js.map