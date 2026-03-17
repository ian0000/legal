import { Request, Response, NextFunction } from "express";
import { UserRole } from "@legal/shared/types/roles";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.role) {
      return res.status(401).json({ message: "No autenticado" });
    }

    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "No autorizado" });
    }

    next();
  };
};
