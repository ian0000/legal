import User from "../../../models/User";

import * as authService from "../auth.user.service";

import { hashPassword, checkPassword } from "../../../utils/auth";

import {
  createVerificationToken,
  validateVerificationToken,
} from "../../../utils/verification-token";

import { generateJWT } from "../../../utils/jwt";

import { AuthEmail } from "../auth.email.service";

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
      (User.findOne as jest.Mock).mockResolvedValue(null);

      (hashPassword as jest.Mock).mockResolvedValue("hashed");

      const createdUser = {
        _id: "1",
        email: "test@test.com",
        firstName: "Ian",
        lastName: "Mena",
      };

      (User.create as jest.Mock).mockResolvedValue(createdUser);

      (createVerificationToken as jest.Mock).mockResolvedValue({
        rawToken: "raw-token",
      });

      await authService.createAccount({
        email: "test@test.com",
        firstName: "Ian",
        lastName: "Mena",
      } as any);

      expect(User.create).toHaveBeenCalled();

      expect(createVerificationToken).toHaveBeenCalled();

      expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalled();
    });

    it("should throw if user already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({});

      await expect(
        authService.createAccount({
          email: "test@test.com",
        } as any),
      ).rejects.toThrow("El usuario ya está registrado");
    });
  });

  // =====================================
  // SETUP ACCOUNT
  // =====================================

  describe("setupAccount", () => {
    it("should setup account correctly", async () => {
      const saveMock = jest.fn();

      (validateVerificationToken as jest.Mock).mockResolvedValue({
        user: "1",
        usedAt: null,
        save: saveMock,
      });

      (User.findById as jest.Mock).mockResolvedValue({
        isConfirmed: false,
        save: saveMock,
      });

      (hashPassword as jest.Mock).mockResolvedValue("hashed");

      await authService.setupAccount("token", "password");

      expect(validateVerificationToken).toHaveBeenCalled();

      expect(saveMock).toHaveBeenCalled();
    });
  });

  // =====================================
  // LOGIN
  // =====================================

  describe("login", () => {
    it("should login correctly", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "1",
        firstName: "Ian",
        lastName: "Mena",
        email: "test@test.com",
        password: "hashed",
        isConfirmed: true,
        isActive: true,
        role: "LAWYER",
      });

      (checkPassword as jest.Mock).mockResolvedValue(true);

      (generateJWT as jest.Mock).mockReturnValue("jwt");

      const result = await authService.login("test@test.com", "123456");

      expect(result).toEqual({
        accessToken: "jwt",

        user: {
          id: "1",
          firstName: "Ian",
          lastName: "Mena",
          email: "test@test.com",
          role: "LAWYER",
        },
      });
    });

    it("should throw if password incorrect", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        password: "hashed",
        isConfirmed: true,
        isActive: true,
      });

      (checkPassword as jest.Mock).mockResolvedValue(false);

      await expect(authService.login("a", "b")).rejects.toThrow("Contraseña incorrecta");
    });
  });

  // =====================================
  // FORGOT PASSWORD
  // =====================================

  describe("forgotPassword", () => {
    it("should send reset token", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "1",
        email: "test@test.com",
        firstName: "Ian",
        lastName: "Mena",
      });

      (createVerificationToken as jest.Mock).mockResolvedValue({
        rawToken: "reset-token",
      });

      await authService.forgotPassword("test@test.com");

      expect(createVerificationToken).toHaveBeenCalled();

      expect(AuthEmail.sendPasswordResetToken).toHaveBeenCalled();
    });
  });

  // =====================================
  // UPDATE PASSWORD WITH TOKEN
  // =====================================

  describe("updatePasswordWithToken", () => {
    it("should update password correctly", async () => {
      const saveMock = jest.fn();

      (validateVerificationToken as jest.Mock).mockResolvedValue({
        user: "1",
        usedAt: null,
        save: saveMock,
      });

      (User.findById as jest.Mock).mockResolvedValue({
        password: "old",
        save: saveMock,
      });

      (hashPassword as jest.Mock).mockResolvedValue("new-hash");

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

      (User.findOne as jest.Mock).mockResolvedValue(null);

      (User.findOne as jest.Mock).mockResolvedValue(null);

      (User.findById as jest.Mock).mockResolvedValue({
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

      (User.findById as jest.Mock).mockResolvedValue({
        password: "hashed",
        save: saveMock,
      });

      (checkPassword as jest.Mock).mockResolvedValue(true);

      (hashPassword as jest.Mock).mockResolvedValue("new-hash");

      await authService.updatePassword("1", {
        currentPassword: "old",
        newPassword: "new",
      });

      expect(saveMock).toHaveBeenCalled();
    });
  });
});
