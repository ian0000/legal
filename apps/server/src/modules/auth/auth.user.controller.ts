import { NextFunction, Request, Response } from "express";
import * as authService from "./auth.user.service";
import { AppError } from "../../utils/AppError";

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.createAccount(req.body);
    res.status(201).json({ message: "Cuenta creada exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const confirmAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.confirmAccount(req.body.token);
    res.status(200).json({ message: "Cuenta confirmada exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authService.login(req.body.email, req.body.password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const requestConfirmationCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.requestConfirmationCode(req.body.email);
    res.status(200).json({ message: "Correo de confirmación enviado" });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.status(200).json({ message: "Revisa tu correo para continuar" });
  } catch (error) {
    next(error);
  }
};

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.validateToken(req.body.token);
    res.json({ message: "Token válido" });
  } catch (error) {
    next(error);
  }
};
export const updatePasswordWithToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (typeof req.params.token !== "string") {
      throw new AppError("Token inválido", 400);
    }

    const token = req.params.token;
    await authService.updatePasswordWithToken(req.params.token, req.body.password);

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await authService.updateProfile(req.userId, req.body);

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.updatePassword(req.userId, req.body);

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};

export const updateUserByOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await authService.updateUserByOwner(
      req.params.userId as string, // usuario objetivo
      req.body,
    );

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};
