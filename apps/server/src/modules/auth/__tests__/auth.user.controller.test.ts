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

  it("createAccount success", async () => {
    const req: any = { body: {} };

    await controller.createAccount(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("createAccount error", async () => {
    (authService.createAccount as jest.Mock).mockRejectedValue(new Error());

    await controller.createAccount({} as any, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("login success", async () => {
    (authService.login as jest.Mock).mockResolvedValue("token");

    const req: any = { body: { email: "a", password: "b" } };

    await controller.login(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ token: "token" });
  });

  it("confirmAccount", async () => {
    const req: any = { body: { token: "a" } };

    await controller.confirmAccount(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("forgotPassword", async () => {
    const req: any = { body: { email: "a" } };

    await controller.forgotPassword(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("updateProfile", async () => {
    const req: any = { userId: "1", body: {} };

    (authService.updateProfile as jest.Mock).mockResolvedValue({});

    await controller.updateProfile(req, res, next);

    expect(res.json).toHaveBeenCalled();
  });

  it("updatePassword", async () => {
    const req: any = { userId: "1", body: {} };

    await controller.updatePassword(req, res, next);

    expect(res.json).toHaveBeenCalled();
  });
});
