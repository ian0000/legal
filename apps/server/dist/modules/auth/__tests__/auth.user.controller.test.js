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
Object.defineProperty(exports, "__esModule", { value: true });
const controller = __importStar(require("../auth.user.controller"));
const authService = __importStar(require("../auth.user.service"));
jest.mock("../auth.user.service");
describe("Auth Controller", () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const next = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("createAccount", () => {
        it("should create account", async () => {
            const req = {
                body: {
                    email: "test@test.com",
                },
            };
            await controller.createAccount(req, res, next);
            expect(authService.createAccount).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Cuenta creada exitosamente",
            });
        });
        it("should call next on error", async () => {
            const error = new Error("fail");
            authService.createAccount.mockRejectedValue(error);
            const req = {
                body: {},
            };
            await controller.createAccount(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    describe("setupAccount", () => {
        it("should setup account", async () => {
            const req = {
                body: {
                    token: "token",
                    password: "123456",
                },
            };
            await controller.setupAccount(req, res, next);
            expect(authService.setupAccount).toHaveBeenCalledWith("token", "123456");
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("login", () => {
        it("should login correctly", async () => {
            authService.login.mockResolvedValue({
                accessToken: "jwt",
                user: {
                    id: "1",
                },
            });
            const req = {
                body: {
                    email: "test@test.com",
                    password: "123456",
                },
            };
            await controller.login(req, res, next);
            expect(authService.login).toHaveBeenCalledWith("test@test.com", "123456");
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("requestConfirmationCode", () => {
        it("should resend confirmation", async () => {
            const req = {
                body: {
                    email: "test@test.com",
                },
            };
            await controller.requestConfirmationCode(req, res, next);
            expect(authService.requestConfirmationCode).toHaveBeenCalledWith("test@test.com");
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("forgotPassword", () => {
        it("should send forgot password email", async () => {
            const req = {
                body: {
                    email: "test@test.com",
                },
            };
            await controller.forgotPassword(req, res, next);
            expect(authService.forgotPassword).toHaveBeenCalledWith("test@test.com");
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("validateToken", () => {
        it("should validate token", async () => {
            authService.validateVerificationToken.mockResolvedValue({
                _id: "1",
            });
            const req = {
                body: {
                    token: "token",
                    type: "PASSWORD_RESET",
                },
            };
            await controller.validateToken(req, res, next);
            expect(authService.validateVerificationToken).toHaveBeenCalledWith("token", "PASSWORD_RESET");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Token válido",
            });
        });
    });
    describe("updatePasswordWithToken", () => {
        it("should update password with token", async () => {
            const req = {
                params: {
                    token: "token",
                },
                body: {
                    password: "123456",
                },
            };
            await controller.updatePasswordWithToken(req, res, next);
            expect(authService.updatePasswordWithToken).toHaveBeenCalledWith("token", "123456");
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("updateProfile", () => {
        it("should update profile", async () => {
            authService.updateProfile.mockResolvedValue({
                id: "1",
            });
            const req = {
                user: {
                    id: "1",
                },
                body: {
                    firstName: "Ian",
                },
            };
            await controller.updateProfile(req, res, next);
            expect(authService.updateProfile).toHaveBeenCalledWith("1", req.body);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    describe("updatePassword", () => {
        it("should update password", async () => {
            const req = {
                user: {
                    id: "1",
                },
                body: {
                    currentPassword: "old",
                    newPassword: "new",
                },
            };
            await controller.updatePassword(req, res, next);
            expect(authService.updatePassword).toHaveBeenCalledWith("1", req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Contraseña actualizada correctamente",
            });
        });
    });
});
//# sourceMappingURL=auth.user.controller.test.js.map