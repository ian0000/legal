import crypto from "crypto";

import Token from "../models/Token";

import { generateToken } from "./token";

import { CreateError } from "./CreateError";
import { TOKEN_TYPES } from "@legal/shared/src/types/roles";

export const createVerificationToken = async (userId: string, type: TOKEN_TYPES) => {
  await Token.deleteMany({
    user: userId,
    type,
  });

  const rawToken = generateToken();

  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  const token = await Token.create({
    token: hashedToken,
    user: userId,
    type,
  });

  return {
    rawToken,
    token,
  };
};

export const validateVerificationToken = async (rawToken: string, type: TOKEN_TYPES) => {
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  const token = await Token.findOne({
    token: hashedToken,
    type,
  });

  if (!token) {
    throw CreateError("Token no válido o expirado", 401);
  }

  if (token.usedAt) {
    throw CreateError("Token ya utilizado", 401);
  }

  return token;
};
