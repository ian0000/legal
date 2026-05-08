import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import User from "../models/User";

import { env } from "../config/env";

import { AppError } from "../utils/AppError";

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer?.startsWith("Bearer ")) {
      throw new AppError("No autenticado", 401);
    }

    const token = bearer.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      role: string;
    };

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("Usuario no encontrado", 404);
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};
