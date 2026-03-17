import { AppError } from "./AppError";

export const CreateError = (message: string, statusCode: number): AppError => {
  return new AppError(message, statusCode);
};
