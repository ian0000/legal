import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod/v3";

export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.issues,
        });
      }

      next(error);
    }
  };
