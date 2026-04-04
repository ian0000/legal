import Token from "../models/Token";
import { UserDocument } from "../models/User";
import bcrypt from "bcrypt";
import { generateToken, tempPassword } from "./token";
import { AuthEmail } from "../modules/auth/auth.email.service";
import { ClientDocument } from "../models/Client";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const checkPassword = async (enteredPassword: string, storedHash: string) => {
  return await bcrypt.compare(enteredPassword, storedHash);
};

export const createSendTokenUser = async (user: UserDocument): Promise<void> => {
  const token = new Token({
    token: generateToken(),
    user: user._id,
  });
  await token.save();

  await AuthEmail.sendConfirmationEmail({
    email: user.email,
    name: user.name,
    token: token.token,
  });
};

export const createSendTokenClient = async (client: ClientDocument): Promise<void> => {
  const hashed = await hashPassword(tempPassword);

  client.password = hashed;
  client.isConfirmed = true;

  await client.save();
  await AuthEmail.sendTemporaryPasswordEmail({
    email: client.email,
    name: client.name,
    token: hashed,
  });
};
