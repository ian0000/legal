import * as controller from "../clients.controller";
import * as service from "../clients.service";

jest.mock("../clients.service");

describe("Client Controller", () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createClient", async () => {
    await controller.createClient({ body: {} } as any, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("requestAccess", async () => {
    await controller.requestAccess({ body: { email: "a" } } as any, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("login", async () => {
    (service.loginClient as jest.Mock).mockResolvedValue("token");

    await controller.login({ body: { email: "a", password: "b" } } as any, res, next);

    expect(res.json).toHaveBeenCalledWith({ token: "token" });
  });

  it("getProfile", async () => {
    (service.getProfile as jest.Mock).mockResolvedValue({});

    await controller.getProfile({ userId: "1" } as any, res, next);

    expect(res.json).toHaveBeenCalled();
  });

  it("updateProfile", async () => {
    (service.updateProfile as jest.Mock).mockResolvedValue({});

    await controller.updateProfile({ userId: "1", body: {} } as any, res, next);

    expect(res.json).toHaveBeenCalled();
  });

  it("changePassword", async () => {
    await controller.changePassword(
      { userId: "1", body: { currentPassword: "a", newPassword: "b" } } as any,
      res,
      next,
    );

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
