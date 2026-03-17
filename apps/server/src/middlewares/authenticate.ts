import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AppError } from "../utils/AppError";
import { UserRole } from "@legal/shared/types/roles";

type JwtPayload = {
  id: string;
  role: UserRole;
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1️⃣ Verificar header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("No autenticado", 401);
    }

    // 2️⃣ Extraer token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verificar secret
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError("JWT_SECRET no configurado", 500);
    }

    // 4️⃣ Verificar token
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.userId = decoded.id;
    req.role = decoded.role;
    console.log("Token verificado, userId:", req.userId, "role:", req.role);
    // 5️⃣ Buscar usuario
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("Usuario no encontrado", 404);
    }

    if (!user.isActive) {
      throw new AppError("Cuenta inactiva", 403);
    }

    // 6️⃣ Adjuntar datos al request
    req.userId = user._id.toString();
    req.role = user.role;

    next();
  } catch (error) {
    next(error);
  }
};
