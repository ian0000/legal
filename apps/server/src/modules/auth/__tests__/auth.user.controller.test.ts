import * as controller from "../auth.user.controller";
import * as authService from "../auth.user.service";

jest.mock("../auth.user.service");

describe("Auth Controller", () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createAccount", () => {
    it("should create account", async () => {
      const req: any = {
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

      (authService.createAccount as jest.Mock).mockRejectedValue(error);

      const req: any = {
        body: {},
      };

      await controller.createAccount(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("setupAccount", () => {
    it("should setup account", async () => {
      const req: any = {
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
      (authService.login as jest.Mock).mockResolvedValue({
        accessToken: "jwt",
        user: {
          id: "1",
        },
      });

      const req: any = {
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
      const req: any = {
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
      const req: any = {
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
      (authService.validateVerificationToken as jest.Mock).mockResolvedValue({
        _id: "1",
      });

      const req: any = {
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
      const req: any = {
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
      (authService.updateProfile as jest.Mock).mockResolvedValue({
        id: "1",
      });

      const req: any = {
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
      const req: any = {
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
