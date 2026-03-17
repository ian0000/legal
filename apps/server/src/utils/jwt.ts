import { UserRole } from "@legal/shared/types/roles";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
type UserPayload = {
  id: Types.ObjectId;
  role: UserRole;
};

export const generateJWT = (payload: UserPayload): string => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "180d",
  });
  return token;
};
