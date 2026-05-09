import { NextFunction, Request, Response } from "express";

import * as authService from "./auth.user.service";

import { AppError } from "../../utils/AppError";
import { validateVerificationToken } from "../../utils/verification-token";

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.createAccount(req.body);

    res.status(201).json({
      message: "Cuenta creada exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export const setupAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body;

    await authService.setupAccount(token, password);

    res.status(200).json({
      message: "Cuenta activada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const requestConfirmationCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.requestConfirmationCode(req.body.email);

    res.status(200).json({
      message: "Correo de confirmación enviado",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.forgotPassword(req.body.email);

    res.status(200).json({
      message: "Revisa tu correo para continuar",
    });
  } catch (error) {
    next(error);
  }
};
export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, type } = req.body;

    await authService.validateVerificationToken(token, type);

    res.status(200).json({
      message: "Token válido",
    });
  } catch (error) {
    next(error);
  }
};
export const updatePasswordWithToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    if (!token || typeof token !== "string") {
      throw new AppError("Token inválido", 400);
    }

    await authService.updatePasswordWithToken(token, password);

    res.status(200).json({
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await authService.updateProfile(req.user!.id, req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.updatePassword(req.user!.id, req.body);

    res.status(200).json({
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfileImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new AppError("Imagen requerida", 400);
    }

    const result = await authService.updateProfileImage(req.user!.id, req.file);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getProfileImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const image = await authService.getProfileImage(req.params.userId as string);

    res.set("Content-Type", image.contentType);

    res.send(image.data);
  } catch (error) {
    next(error);
  }
};
