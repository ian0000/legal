import { Request, Response, NextFunction } from "express";
import { UserRole } from "@legal/shared/src/types/roles";
import { AppError } from "../utils/AppError";

export const authorize =
  (...allowedRoles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("No autenticado", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError("No autorizado", 403));
    }

    next();
  };
