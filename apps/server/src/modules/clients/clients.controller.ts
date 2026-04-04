import { NextFunction, Request, Response } from "express";
import * as clientService from "./clients.service";
import { AppError } from "../../utils/AppError";

interface Params {
  nationalId: string;
}

// 👨‍⚖️ Crear cliente (admin)
export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await clientService.createClient(req.body);
    res.status(201).json({ message: "Cliente creado exitosamente" });
  } catch (error) {
    next(error);
  }
};

// 🔐 Solicitar acceso (clave temporal)
export const requestAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.email) {
      throw new AppError("Email es requerido", 400);
    }

    await clientService.requestAccess(req.body.email);

    res.status(200).json({ message: "Clave enviada al correo" });
  } catch (error) {
    next(error);
  }
};

// 🔐 Login cliente
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await clientService.loginClient(req.body.email, req.body.password);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// 👤 Perfil
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await clientService.getProfile(req.userId);

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

// ✏️ Actualizar perfil
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await clientService.updateProfile(req.userId, req.body);

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// 🔑 Cambiar contraseña
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await clientService.changePassword(req.userId, req.body.currentPassword, req.body.newPassword);

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};

// 🔎 Consulta por cédula (sin login)
export const getCases = async (req: Request<Params>, res: Response, next: NextFunction) => {
  try {
    const cases = await clientService.getCasesByNationalId(req.params.nationalId);

    res.status(200).json(cases);
  } catch (error) {
    next(error);
  }
};
