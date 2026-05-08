import { UserRole } from "@legal/shared/src/types/roles";
import jwt from "jsonwebtoken";
type UserPayload = {
  id: string;
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
