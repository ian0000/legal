import crypto from "crypto";

export const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const tempPassword = Math.random().toString(36).slice(-8);
