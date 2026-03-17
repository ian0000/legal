import User from "@/models/User";
import * as authService from "../user/auth.user.service";
import { hashPassword, checkPassword } from "@/utils/auth";
import { generateJWT } from "@/utils/jwt";
import { USER_ROLES } from "@legal/shared/types/roles";

jest.mock("@/models/User");
jest.mock("@/models/Token");
jest.mock("@/utils/auth");
jest.mock("@/utils/jwt");
jest.mock("@/modules/auth/auth.email.service");

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =============================
  // CREATE ACCOUNT
  // =============================

  describe("createAccount", () => {
    it("should create a new user", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (hashPassword as jest.Mock).mockResolvedValue("hashed");

      const saveMock = jest.fn();
      (User as any).mockImplementation(() => ({
        save: saveMock,
        _id: "123",
        email: "test@test.com",
        name: "Test",
      }));

      await authService.createAccount({
        email: "test@test.com",
        password: "123456",
        name: "Test",
      } as any);

      expect(User.findOne).toHaveBeenCalled();
      expect(hashPassword).toHaveBeenCalled();
      expect(saveMock).toHaveBeenCalled();
    });

    it("should throw if user exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({});

      await expect(
        authService.createAccount({
          email: "test@test.com",
          password: "123456",
          name: "Test",
        } as any),
      ).rejects.toThrow("El usuario ya esta registrado");
    });
  });

  // =============================
  // LOGIN
  // =============================

  describe("login", () => {
    it("should return JWT if credentials are valid", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "123",
        email: "test@test.com",
        password: "hashed",
        isConfirmed: true,
        isActive: true,
      });

      (checkPassword as jest.Mock).mockResolvedValue(true);
      (generateJWT as jest.Mock).mockReturnValue("jwt-token");

      const token = await authService.login("test@test.com", "123456");

      expect(token).toBe("jwt-token");
    });

    it("should throw if password is incorrect", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        password: "hashed",
        isConfirmed: true,
        isActive: true,
      });

      (checkPassword as jest.Mock).mockResolvedValue(false);

      await expect(authService.login("test@test.com", "wrong")).rejects.toThrow(
        "Contraseña incorrecta",
      );
    });
  });

  // =============================
  // UPDATE USER BY OWNER
  // =============================

  describe("updateUserByOwner", () => {
    it("should update role if current user is owner", async () => {
      const saveMock = jest.fn();

      (User.findById as jest.Mock).mockResolvedValue({
        role: USER_ROLES.LAWYER,
        isActive: true,
        save: saveMock,
      });

      await authService.updateUserByOwner("2", {
        role: USER_ROLES.INTERN,
      });

      expect(saveMock).toHaveBeenCalled();
    });

    it("should throw if current user is not owner", async () => {
      await expect(
        authService.updateUserByOwner("2", {
          role: USER_ROLES.INTERN,
        }),
      ).rejects.toThrow("No autorizado");
    });
  });

  // =============================
  // UPDATE PASSWORD
  // =============================

  describe("updatePassword", () => {
    it("should update password if current matches", async () => {
      const saveMock = jest.fn();

      (User.findById as jest.Mock).mockResolvedValue({
        password: "hashed",
        save: saveMock,
      });

      (checkPassword as jest.Mock).mockResolvedValue(true);
      (hashPassword as jest.Mock).mockResolvedValue("newHashed");

      await authService.updatePassword("123", {
        currentPassword: "old",
        newPassword: "new",
      });

      expect(saveMock).toHaveBeenCalled();
    });

    it("should throw if current password incorrect", async () => {
      (User.findById as jest.Mock).mockResolvedValue({
        password: "hashed",
      });

      (checkPassword as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.updatePassword("123", {
          currentPassword: "wrong",
          newPassword: "new",
        }),
      ).rejects.toThrow("Contraseña actual incorrecta");
    });
  });
});
