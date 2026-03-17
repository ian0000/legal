import { Request, Response, NextFunction } from "express";
import { PERMISSIONS, Permission } from "@/config/permissions";

export const authorizePermission = (permission: Permission) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.role) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const allowedRoles = PERMISSIONS[permission];

    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "No autorizado" });
    }

    next();
  };
};
