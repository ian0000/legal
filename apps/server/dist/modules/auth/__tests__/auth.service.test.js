"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../models/User"));
const authService = __importStar(require("../auth.user.service"));
const auth_1 = require("../../../utils/auth");
const verification_token_1 = require("../../../utils/verification-token");
const jwt_1 = require("../../../utils/jwt");
const auth_email_service_1 = require("../auth.email.service");
jest.mock("../../../models/User");
jest.mock("../../../utils/auth");
jest.mock("../../../utils/verification-token");
jest.mock("../../../utils/jwt");
jest.mock("../auth.email.service");
describe("Auth Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // =====================================
    // CREATE ACCOUNT
    // =====================================
    describe("createAccount", () => {
        it("should create account and send setup token", async () => {
            User_1.default.findOne.mockResolvedValue(null);
            auth_1.hashPassword.mockResolvedValue("hashed");
            const createdUser = {
                _id: "1",
                email: "test@test.com",
                firstName: "Ian",
                lastName: "Mena",
            };
            User_1.default.create.mockResolvedValue(createdUser);
            verification_token_1.createVerificationToken.mockResolvedValue({
                rawToken: "raw-token",
            });
            await authService.createAccount({
                email: "test@test.com",
                firstName: "Ian",
                lastName: "Mena",
            });
            expect(User_1.default.create).toHaveBeenCalled();
            expect(verification_token_1.createVerificationToken).toHaveBeenCalled();
            expect(auth_email_service_1.AuthEmail.sendConfirmationEmail).toHaveBeenCalled();
        });
        it("should throw if user already exists", async () => {
            User_1.default.findOne.mockResolvedValue({});
            await expect(authService.createAccount({
                email: "test@test.com",
            })).rejects.toThrow("El usuario ya está registrado");
        });
    });
    // =====================================
    // SETUP ACCOUNT
    // =====================================
    describe("setupAccount", () => {
        it("should setup account correctly", async () => {
            const saveMock = jest.fn();
            verification_token_1.validateVerificationToken.mockResolvedValue({
                user: "1",
                usedAt: null,
                save: saveMock,
            });
            User_1.default.findById.mockResolvedValue({
                isConfirmed: false,
                save: saveMock,
            });
            auth_1.hashPassword.mockResolvedValue("hashed");
            await authService.setupAccount("token", "password");
            expect(verification_token_1.validateVerificationToken).toHaveBeenCalled();
            expect(saveMock).toHaveBeenCalled();
        });
    });
    // =====================================
    // LOGIN
    // =====================================
    describe("login", () => {
        it("should login correctly", async () => {
            User_1.default.findOne.mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    _id: "1",
                    firstName: "Ian",
                    lastName: "Mena",
                    email: "test@test.com",
                    password: "hashed",
                    isConfirmed: true,
                    isActive: true,
                    role: "LAWYER",
                }),
            });
            auth_1.checkPassword.mockResolvedValue(true);
            jwt_1.generateJWT.mockReturnValue("jwt");
            const result = await authService.login("test@test.com", "123456");
            expect(result).toEqual({
                accessToken: "jwt",
                user: {
                    id: "1",
                    firstName: "Ian",
                    lastName: "Mena",
                    email: "test@test.com",
                    role: "LAWYER",
                    profileImageUrl: null,
                },
            });
        });
        it("should throw if password incorrect", async () => {
            User_1.default.findOne.mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    password: "hashed",
                    isConfirmed: true,
                    isActive: true,
                }),
            });
            auth_1.checkPassword.mockResolvedValue(false);
            await expect(authService.login("a", "b")).rejects.toThrow("Contraseña incorrecta");
        });
    });
    // =====================================
    // FORGOT PASSWORD
    // =====================================
    describe("forgotPassword", () => {
        it("should send reset token", async () => {
            User_1.default.findOne.mockResolvedValue({
                _id: "1",
                email: "test@test.com",
                firstName: "Ian",
                lastName: "Mena",
            });
            verification_token_1.createVerificationToken.mockResolvedValue({
                rawToken: "reset-token",
            });
            await authService.forgotPassword("test@test.com");
            expect(verification_token_1.createVerificationToken).toHaveBeenCalled();
            expect(auth_email_service_1.AuthEmail.sendPasswordResetToken).toHaveBeenCalled();
        });
    });
    // =====================================
    // UPDATE PASSWORD WITH TOKEN
    // =====================================
    describe("updatePasswordWithToken", () => {
        it("should update password correctly", async () => {
            const saveMock = jest.fn();
            verification_token_1.validateVerificationToken.mockResolvedValue({
                user: "1",
                usedAt: null,
                save: saveMock,
            });
            User_1.default.findById.mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    password: "old",
                    save: saveMock,
                }),
            });
            auth_1.hashPassword.mockResolvedValue("new-hash");
            await authService.updatePasswordWithToken("token", "newPassword");
            expect(saveMock).toHaveBeenCalled();
        });
    });
    // =====================================
    // UPDATE PROFILE
    // =====================================
    describe("updateProfile", () => {
        it("should update profile", async () => {
            const saveMock = jest.fn();
            User_1.default.findOne.mockResolvedValue(null);
            User_1.default.findOne.mockResolvedValue(null);
            User_1.default.findById.mockResolvedValue({
                _id: "1",
                email: "old@test.com",
                firstName: "Old",
                lastName: "Name",
                save: saveMock,
            });
            const result = await authService.updateProfile("1", {
                email: "new@test.com",
                firstName: "New",
                lastName: "Name",
            });
            expect(saveMock).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
    });
    // =====================================
    // UPDATE PASSWORD
    // =====================================
    describe("updatePassword", () => {
        it("should update password", async () => {
            const saveMock = jest.fn();
            User_1.default.findById.mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    password: "hashed",
                    save: saveMock,
                }),
            });
            auth_1.checkPassword.mockResolvedValue(true);
            auth_1.hashPassword.mockResolvedValue("new-hash");
            await authService.updatePassword("1", {
                currentPassword: "old",
                newPassword: "new",
            });
            expect(saveMock).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=auth.service.test.js.map