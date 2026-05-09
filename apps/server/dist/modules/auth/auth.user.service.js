"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVerificationToken = exports.validateVerificationTokenService = exports.getProfileImage = exports.updateProfileImage = exports.updatePassword = exports.updateProfile = exports.updatePasswordWithToken = exports.forgotPassword = exports.requestConfirmationCode = exports.login = exports.setupAccount = exports.createAccount = void 0;
const User_1 = __importDefault(require("../../models/User"));
const auth_email_service_1 = require("./auth.email.service");
const CreateError_1 = require("../../utils/CreateError");
const auth_1 = require("../../utils/auth");
const verification_token_1 = require("../../utils/verification-token");
const jwt_1 = require("../../utils/jwt");
const tokens_1 = require("@legal/shared/src/types/tokens");
// =====================================
// CREATE ACCOUNT
// =====================================
const createAccount = async (data) => {
    const existingUser = await User_1.default.findOne({
        email: data.email,
    });
    if (existingUser) {
        throw (0, CreateError_1.CreateError)("El usuario ya está registrado", 409);
    }
    const user = await User_1.default.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        isConfirmed: false,
        isActive: true,
    });
    const verification = await (0, verification_token_1.createVerificationToken)(user._id.toString(), tokens_1.TOKEN_TYPES.ACCOUNT_SETUP);
    await auth_email_service_1.AuthEmail.sendConfirmationEmail({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: verification.rawToken,
    });
    return user;
};
exports.createAccount = createAccount;
// =====================================
// SETUP ACCOUNT
// =====================================
const setupAccount = async (token, password) => {
    const verification = await (0, exports.validateVerificationToken)(token, tokens_1.TOKEN_TYPES.ACCOUNT_SETUP);
    const user = await User_1.default.findById(verification.user);
    if (!user) {
        throw (0, CreateError_1.CreateError)("Usuario no encontrado", 404);
    }
    user.password = await (0, auth_1.hashPassword)(password);
    user.isConfirmed = true;
    await user.save();
    verification.usedAt = new Date();
    await verification.save();
    return user;
};
exports.setupAccount = setupAccount;
// =====================================
// LOGIN
// =====================================
const login = async (email, password) => {
    const user = await User_1.default.findOne({
        email,
    }).select("+password");
    if (!user) {
        throw (0, CreateError_1.CreateError)("Usuario no encontrado", 404);
    }
    if (!user.isConfirmed) {
        throw (0, CreateError_1.CreateError)("Cuenta no confirmada", 401);
    }
    if (!user.isActive) {
        throw (0, CreateError_1.CreateError)("Cuenta inactiva", 403);
    }
    const isPasswordCorrect = await (0, auth_1.checkPassword)(password, user.password);
    if (!isPasswordCorrect) {
        throw (0, CreateError_1.CreateError)("Contraseña incorrecta", 401);
    }
    const accessToken = (0, jwt_1.generateJWT)({
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
exports.login = login;
// =====================================
// REQUEST CONFIRMATION CODE
// =====================================
const requestConfirmationCode = async (email) => {
    const user = await User_1.default.findOne({
        email,
    });
    if (!user) {
        throw (0, CreateError_1.CreateError)("Usuario no encontrado", 404);
    }
    if (user.isConfirmed) {
        throw (0, CreateError_1.CreateError)("Cuenta ya confirmada", 400);
    }
    const verification = await (0, verification_token_1.createVerificationToken)(user._id.toString(), tokens_1.TOKEN_TYPES.EMAIL_CONFIRMATION);
    await auth_email_service_1.AuthEmail.sendConfirmationEmail({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: verification.rawToken,
    });
};
exports.requestConfirmationCode = requestConfirmationCode;
// =====================================
// FORGOT PASSWORD
// =====================================
const forgotPassword = async (email) => {
    const user = await User_1.default.findOne({
        email,
    });
    if (!user) {
        throw (0, CreateError_1.CreateError)("Usuario no encontrado", 404);
    }
    const verification = await (0, verification_token_1.createVerificationToken)(user._id.toString(), tokens_1.TOKEN_TYPES.PASSWORD_RESET);
    await auth_email_service_1.AuthEmail.sendPasswordResetToken({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: verification.rawToken,
    });
};
exports.forgotPassword = forgotPassword;
// =====================================
// UPDATE PASSWORD WITH TOKEN
// =====================================
const updatePasswordWithToken = async (token, password) => {
    const verification = await (0, exports.validateVerificationToken)(token, tokens_1.TOKEN_TYPES.PASSWORD_RESET);
    const user = await User_1.default.findById(verification.user).select("+password");
    if (!user) {
        throw (0, CreateError_1.CreateError)("Usuario no encontrado", 404);
    }
    user.password = await (0, auth_1.hashPassword)(password);
    await user.save();
    verification.usedAt = new Date();
    await verification.save();
};
exports.updatePasswordWithToken = updatePasswordWithToken;
// =====================================
// UPDATE PROFILE
// =====================================
const updateProfile = async (userId, data) => {
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw (0, CreateError_1.CreateError)("Usuario no encontrado", 404);
    }
    if (data.email && data.email !== user.email) {
        const emailExists = await User_1.default.findOne({
            email: data.email,
        });
        if (emailExists) {
            throw (0, CreateError_1.CreateError)("El email ya esta en uso", 409);
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
exports.updateProfile = updateProfile;
// =====================================
// UPDATE PASSWORD
// =====================================
const updatePassword = async (userId, data) => {
    const user = await User_1.default.findById(userId).select("+password");
    if (!user) {
        throw (0, CreateError_1.CreateError)("Usuario no encontrado", 404);
    }
    const isPasswordCorrect = await (0, auth_1.checkPassword)(data.currentPassword, user.password);
    if (!isPasswordCorrect) {
        throw (0, CreateError_1.CreateError)("Contraseña incorrecta", 401);
    }
    user.password = await (0, auth_1.hashPassword)(data.newPassword);
    await user.save();
};
exports.updatePassword = updatePassword;
const updateProfileImage = async (userId, file) => {
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw (0, CreateError_1.CreateError)("Usuario no encontrado", 404);
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
exports.updateProfileImage = updateProfileImage;
const getProfileImage = async (userId) => {
    const user = await User_1.default.findById(userId);
    if (!user || !user.profileImage) {
        throw (0, CreateError_1.CreateError)("Imagen no encontrada", 404);
    }
    return user.profileImage;
};
exports.getProfileImage = getProfileImage;
const validateVerificationTokenService = async (token, type) => {
    return await (0, verification_token_1.validateVerificationToken)(token, type);
};
exports.validateVerificationTokenService = validateVerificationTokenService;
exports.validateVerificationToken = exports.validateVerificationTokenService;
//# sourceMappingURL=auth.user.service.js.map