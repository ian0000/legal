import User from "../../../models/User";
import Token from "../../../models/Token";
import * as authService from "../auth.user.service";
import { hashPassword, checkPassword, createSendTokenUser } from "../../../utils/auth";
import { generateJWT } from "../../../utils/jwt";
import { generateToken } from "../../../utils/token";
import { AuthEmail } from "../auth.email.service";

jest.mock("@/models/User");
jest.mock("@/models/Token");
jest.mock("@/utils/auth");
jest.mock("@/utils/jwt");
jest.mock("@/utils/token");
jest.mock("../auth.email.service");

describe("Auth Service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // =============================
  // CREATE ACCOUNT
  // =============================
  describe("createAccount", () => {
    it("should create user and send token", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (hashPassword as jest.Mock).mockResolvedValue("hashed");

      const saveMock = jest.fn();

      (User as any).mockImplementation(() => ({
        save: saveMock,
        email: "test@test.com",
        name: "Test",
      }));

      await authService.createAccount({
        email: "test@test.com",
        name: "Test",
        password: "123",
      } as any);

      expect(saveMock).toHaveBeenCalled();
      expect(createSendTokenUser).toHaveBeenCalled();
    });

    it("should throw if user exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({});

      await expect(authService.createAccount({ email: "test@test.com" } as any)).rejects.toThrow(
        "El usuario ya esta registrado",
      );
    });
  });

  // =============================
  // CONFIRM ACCOUNT
  // =============================
  describe("confirmAccount", () => {
    it("should confirm account", async () => {
      const deleteMock = jest.fn();
      const saveMock = jest.fn();

      (Token.findOne as jest.Mock).mockResolvedValue({
        user: "123",
        deleteOne: deleteMock,
      });

      (User.findById as jest.Mock).mockResolvedValue({
        isConfirmed: false,
        save: saveMock,
      });

      await authService.confirmAccount("token");

      expect(saveMock).toHaveBeenCalled();
      expect(deleteMock).toHaveBeenCalled();
    });

    it("should throw if token invalid", async () => {
      (Token.findOne as jest.Mock).mockResolvedValue(null);

      await expect(authService.confirmAccount("bad")).rejects.toThrow("Token no valido");
    });
  });

  // =============================
  // LOGIN
  // =============================
  describe("login", () => {
    it("should login correctly", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "1",
        password: "hashed",
        isConfirmed: true,
        isActive: true,
        role: "LAWYER",
      });

      (checkPassword as jest.Mock).mockResolvedValue(true);
      (generateJWT as jest.Mock).mockReturnValue("jwt");

      const result = await authService.login("a", "b");

      expect(result).toBe("jwt");
    });

    it("should throw if not confirmed", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        isConfirmed: false,
      });

      await expect(authService.login("a", "b")).rejects.toThrow("Cuenta no confirmada");
    });

    it("should throw if inactive", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        isConfirmed: true,
        isActive: false,
      });

      await expect(authService.login("a", "b")).rejects.toThrow("Cuenta inactiva");
    });

    it("should throw if password wrong", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        isConfirmed: true,
        isActive: true,
        password: "hashed",
      });

      (checkPassword as jest.Mock).mockResolvedValue(false);

      await expect(authService.login("a", "b")).rejects.toThrow("Contraseña incorrecta");
    });
  });

  // =============================
  // REQUEST CONFIRMATION
  // =============================
  describe("requestConfirmationCode", () => {
    it("should send token", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        isConfirmed: false,
      });

      await authService.requestConfirmationCode("a");

      expect(createSendTokenUser).toHaveBeenCalled();
    });

    it("should throw if confirmed", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        isConfirmed: true,
      });

      await expect(authService.requestConfirmationCode("a")).rejects.toThrow(
        "Cuenta ya confirmada",
      );
    });
  });

  // =============================
  // FORGOT PASSWORD
  // =============================
  describe("forgotPassword", () => {
    it("should send email and save token", async () => {
      const saveMock = jest.fn();

      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "1",
        email: "test@test.com",
        name: "Test",
      });

      (generateToken as jest.Mock).mockReturnValue("token");

      (Token as any).mockImplementation(() => ({
        token: "token",
        save: saveMock,
      }));

      await authService.forgotPassword("a");

      expect(saveMock).toHaveBeenCalled();
      expect(AuthEmail.sendPasswordResetToken).toHaveBeenCalled();
    });
  });

  // =============================
  // VALIDATE TOKEN
  // =============================
  describe("validateToken", () => {
    it("should validate token", async () => {
      (Token.findOne as jest.Mock).mockResolvedValue({});

      const result = await authService.validateToken("a");

      expect(result).toBeDefined();
    });

    it("should throw if invalid", async () => {
      (Token.findOne as jest.Mock).mockResolvedValue(null);

      await expect(authService.validateToken("a")).rejects.toThrow("Token no valido");
    });
  });

  // =============================
  // UPDATE PASSWORD WITH TOKEN
  // =============================
  describe("updatePasswordWithToken", () => {
    it("should update password", async () => {
      const saveMock = jest.fn();
      const deleteMock = jest.fn();

      (Token.findOne as jest.Mock).mockResolvedValue({
        user: "1",
        deleteOne: deleteMock,
      });

      (User.findById as jest.Mock).mockResolvedValue({
        save: saveMock,
      });

      (hashPassword as jest.Mock).mockResolvedValue("hashed");

      await authService.updatePasswordWithToken("t", "123");

      expect(saveMock).toHaveBeenCalled();
      expect(deleteMock).toHaveBeenCalled();
    });
  });

  // =============================
  // UPDATE PROFILE
  // =============================
  describe("updateProfile", () => {
    it("should update user", async () => {
      const saveMock = jest.fn();

      (User.findById as jest.Mock).mockResolvedValue({
        email: "old",
        name: "old",
        save: saveMock,
      });

      const result = await authService.updateProfile("1", {
        email: "new",
        name: "new",
      });

      expect(saveMock).toHaveBeenCalled();
      expect(result).toBeDefined();
    });
  });

  // =============================
  // UPDATE PASSWORD
  // =============================
  describe("updatePassword", () => {
    it("should update password", async () => {
      const saveMock = jest.fn();

      (User.findById as jest.Mock).mockResolvedValue({
        password: "hashed",
        save: saveMock,
      });

      (checkPassword as jest.Mock).mockResolvedValue(true);
      (hashPassword as jest.Mock).mockResolvedValue("new");

      await authService.updatePassword("1", {
        currentPassword: "a",
        newPassword: "b",
      });

      expect(saveMock).toHaveBeenCalled();
    });
  });
});
