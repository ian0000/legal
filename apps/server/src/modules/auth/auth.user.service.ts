import User from "../../models/User";

import { AuthEmail } from "./auth.email.service";

import { CreateError } from "../../utils/CreateError";

import { hashPassword, checkPassword } from "../../utils/auth";

import {
  createVerificationToken,
  validateVerificationToken as validateVerificationTokenUtil,
} from "../../utils/verification-token";

import { generateJWT } from "../../utils/jwt";
import { TOKEN_TYPES } from "@legal/shared/src/types/tokens";

interface CreateAccountInput {
  email: string;
  firstName: string;
  lastName: string;
}

interface UpdateProfileInput {
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}

// =====================================
// CREATE ACCOUNT
// =====================================

export const createAccount = async (data: CreateAccountInput) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw CreateError("El usuario ya está registrado", 409);
  }

  const user = await User.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,

    isConfirmed: false,
    isActive: true,
  });

  const verification = await createVerificationToken(
    user._id.toString(),
    TOKEN_TYPES.ACCOUNT_SETUP,
  );

  await AuthEmail.sendConfirmationEmail({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    token: verification.rawToken,
  });

  return user;
};

// =====================================
// SETUP ACCOUNT
// =====================================

export const setupAccount = async (token: string, password: string) => {
  const verification = await validateVerificationToken(token, TOKEN_TYPES.ACCOUNT_SETUP);

  const user = await User.findById(verification.user);

  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }

  user.password = await hashPassword(password);

  user.isConfirmed = true;

  await user.save();

  verification.usedAt = new Date();

  await verification.save();

  return user;
};

// =====================================
// LOGIN
// =====================================

export const login = async (email: string, password: string) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }

  if (!user.isConfirmed) {
    throw CreateError("Cuenta no confirmada", 401);
  }

  if (!user.isActive) {
    throw CreateError("Cuenta inactiva", 403);
  }

  const isPasswordCorrect = await checkPassword(password, user.password);

  if (!isPasswordCorrect) {
    throw CreateError("Contraseña incorrecta", 401);
  }

  const accessToken = generateJWT({
    id: user._id.toString(),
    role: user.role,
  });

  return {
    accessToken,

    user: {
      id: user._id.toString(),

      firstName: user.firstName,

      lastName: user.lastName,

      email: user.email,

      role: user.role,

      profileImageUrl: user.profileImage ? `/auth/profile-image/${user._id}` : null,
    },
  };
};

// =====================================
// REQUEST CONFIRMATION CODE
// =====================================

export const requestConfirmationCode = async (email: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }

  if (user.isConfirmed) {
    throw CreateError("Cuenta ya confirmada", 400);
  }

  const verification = await createVerificationToken(
    user._id.toString(),
    TOKEN_TYPES.EMAIL_CONFIRMATION,
  );

  await AuthEmail.sendConfirmationEmail({
    email: user.email,

    firstName: user.firstName,

    lastName: user.lastName,

    token: verification.rawToken,
  });
};

// =====================================
// FORGOT PASSWORD
// =====================================

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }

  const verification = await createVerificationToken(
    user._id.toString(),
    TOKEN_TYPES.PASSWORD_RESET,
  );

  await AuthEmail.sendPasswordResetToken({
    email: user.email,

    firstName: user.firstName,

    lastName: user.lastName,

    token: verification.rawToken,
  });
};
// =====================================
// UPDATE PASSWORD WITH TOKEN
// =====================================

export const updatePasswordWithToken = async (token: string, password: string) => {
  const verification = await validateVerificationToken(token, TOKEN_TYPES.PASSWORD_RESET);

  const user = await User.findById(verification.user).select("+password");

  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }

  user.password = await hashPassword(password);

  await user.save();

  verification.usedAt = new Date();

  await verification.save();
};

// =====================================
// UPDATE PROFILE
// =====================================

export const updateProfile = async (userId: string, data: UpdateProfileInput) => {
  const user = await User.findById(userId);

  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }

  if (data.email && data.email !== user.email) {
    const emailExists = await User.findOne({
      email: data.email,
    });

    if (emailExists) {
      throw CreateError("El email ya esta en uso", 409);
    }

    user.email = data.email;
  }

  if (data.firstName) {
    user.firstName = data.firstName;
  }

  if (data.lastName) {
    user.lastName = data.lastName;
  }

  await user.save();

  return {
    id: user._id.toString(),

    email: user.email,

    firstName: user.firstName,

    lastName: user.lastName,

    role: user.role,
  };
};

// =====================================
// UPDATE PASSWORD
// =====================================

export const updatePassword = async (userId: string, data: UpdatePasswordInput) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }

  const isPasswordCorrect = await checkPassword(data.currentPassword, user.password);

  if (!isPasswordCorrect) {
    throw CreateError("Contraseña incorrecta", 401);
  }

  user.password = await hashPassword(data.newPassword);

  await user.save();
};

export const updateProfileImage = async (userId: string, file: Express.Multer.File) => {
  const user = await User.findById(userId);

  if (!user) {
    throw CreateError("Usuario no encontrado", 404);
  }

  user.profileImage = {
    data: file.buffer,

    contentType: file.mimetype,

    filename: file.originalname,

    uploadedAt: new Date(),
  };

  await user.save();

  return {
    message: "Imagen actualizada correctamente",
  };
};
export const getProfileImage = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user || !user.profileImage) {
    throw CreateError("Imagen no encontrada", 404);
  }

  return user.profileImage;
};
export const validateVerificationTokenService = async (token: string, type: TOKEN_TYPES) => {
  return await validateVerificationTokenUtil(token, type);
};

export const validateVerificationToken = validateVerificationTokenService;
