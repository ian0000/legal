import Token from "../../../models/Token";
import User, {
  CreateUserDTO,
  UpdatePasswordDTO,
  UpdateUserByOwnerDTO,
  UpdateUserDTO,
  UserDocument,
} from "../../../models/User";
import { checkPassword, createSendTokenUser, hashPassword } from "../../../utils/auth";
import { generateJWT } from "../../../utils/jwt";
import { generateToken, tempPassword } from "../../../utils/token";
import { AuthEmail } from "../auth.email.service";
import { CreateError } from "../../../utils/CreateError";

export const createAccount = async (data: CreateUserDTO) => {
  const { email } = data;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw CreateError("El usuario ya esta registrado", 409);
  }

  const user = new User(data);

  user.password = await hashPassword(tempPassword);

  await user.save();
  await createSendTokenUser(user);
};

export const confirmAccount = async (token: string) => {
  const tokenExists = await Token.findOne({ token });
  if (!tokenExists) {
    throw CreateError("Token no valido", 404);
  }

  const user = await User.findById(tokenExists.user);
  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }

  user.isConfirmed = true;
  await Promise.all([user.save(), tokenExists.deleteOne()]);
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }
  if (!user.isConfirmed) {
    await createSendTokenUser(user);
    throw CreateError("Cuenta no confirmada, se envio un correo con el token", 401);
  }
  if (!user.isActive) {
    throw CreateError("Cuenta inactiva, contacta al administrador", 403);
  }
  const isMatch = await checkPassword(password, user.password);
  if (!isMatch) {
    throw CreateError("Contraseña incorrecta", 401);
  }
  return generateJWT({ id: user._id, role: user.role });
};

export const requestConfirmationCode = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }
  if (user.isConfirmed) {
    throw CreateError("Cuenta ya confirmada", 409);
  }
  await createSendTokenUser(user);
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }
  const token = new Token({
    token: generateToken(),
    user: user._id,
  });

  await AuthEmail.sendPasswordResetToken({
    email: user.email,
    name: user.name,
    token: token.token,
  });
  await token.save();
};

export const validateToken = async (token: string) => {
  const tokenExists = await Token.findOne({ token });
  if (!tokenExists) {
    throw CreateError("Token no valido", 404);
  }
  return tokenExists;
};

export const updatePasswordWithToken = async (token: string, newPassword: string) => {
  const tokenExists = await Token.findOne({ token });
  if (!tokenExists) {
    throw CreateError("Token no valido", 404);
  }
  const user = await User.findById(tokenExists.user);
  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }
  user.password = await hashPassword(newPassword);
  await Promise.all([user.save(), tokenExists.deleteOne()]);
};

export const updateProfile = async (userId: string, data: UpdateUserDTO) => {
  const user = await User.findById(userId);
  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }
  if (data.email !== undefined && data.email !== user.email) {
    const emailExists = await User.findOne({ email: data.email });
    if (emailExists) {
      throw CreateError("El email ya esta en uso", 409);
    }
    user.email = data.email;
  }

  if (data.name !== undefined && data.name !== user.name) {
    user.name = data.name;
  }

  await user.save();
  return user;
};

export const updatePassword = async (userId: string, data: UpdatePasswordDTO) => {
  const user = await User.findById(userId);
  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }
  const isMatch = await checkPassword(data.currentPassword, user.password);
  if (!isMatch) {
    throw CreateError("Contraseña actual incorrecta", 401);
  }
  user.password = await hashPassword(data.newPassword);
  await user.save();
};

export const updateUserByOwner = async (targetUserId: string, data: UpdateUserByOwnerDTO) => {
  const user = await User.findById(targetUserId);
  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }

  if (data.role !== undefined && data.role !== user.role) {
    user.role = data.role;
  }

  if (data.isActive !== undefined && data.isActive !== user.isActive) {
    user.isActive = data.isActive;
  }

  await user.save();
  return user;
};

//esta no deberia ir aqui, pero por ahora la dejo aqui para no crear un nuevo servicio, esta funcion se usara para validar el token en el middleware de autenticacion y obtener el usuario asociado al token
export const findUserByToken = async (token: string) => {
  const tokenExists = await Token.findOne({ token });
  if (!tokenExists) {
    throw CreateError("Token no valido", 404);
  }
  const user = await User.findById(tokenExists.user);
  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }
  return user;
};
