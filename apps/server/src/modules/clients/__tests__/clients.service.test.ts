import Client from "@/models/Client";
import Case from "@/models/Case";
import * as service from "../clients.service";
import { checkPassword, hashPassword, createSendTokenClient } from "../../../utils/auth";
import { generateJWT } from "@/utils/jwt";

jest.mock("@/models/Client");
jest.mock("@/models/Case");
jest.mock("@/utils/auth");
jest.mock("@/utils/jwt");

describe("Client Service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // =============================
  // GET CASES
  // =============================
  it("should return cases by nationalId", async () => {
    (Client.findOne as jest.Mock).mockResolvedValue({ _id: "1" });

    (Case.find as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(["case"]),
    });

    const result = await service.getCasesByNationalId("123");

    expect(result).toEqual(["case"]);
  });

  it("should throw if client not found", async () => {
    (Client.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.getCasesByNationalId("123")).rejects.toThrow("Cliente no encontrado");
  });

  // =============================
  // LOGIN
  // =============================
  it("should login client", async () => {
    (Client.findOne as jest.Mock).mockResolvedValue({
      _id: "1",
      password: "hashed",
      isConfirmed: true,
      isActive: true,
      save: jest.fn(),
    });

    (checkPassword as jest.Mock).mockResolvedValue(true);
    (generateJWT as jest.Mock).mockReturnValue("token");

    const result = await service.loginClient("a", "b");

    expect(result).toBe("token");
  });

  it("should throw if not confirmed", async () => {
    (Client.findOne as jest.Mock).mockResolvedValue({
      isConfirmed: false,
    });

    await expect(service.loginClient("a", "b")).rejects.toThrow("Cuenta no confirmada");
  });

  // =============================
  // CREATE CLIENT
  // =============================
  it("should create client", async () => {
    (Client.findOne as jest.Mock).mockResolvedValue(null);

    const saveMock = jest.fn();

    (Client as any).mockImplementation(() => ({
      save: saveMock,
    }));

    const result = await service.createClient({
      email: "a",
      nationalId: "1",
    });

    expect(saveMock).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it("should throw if exists", async () => {
    (Client.findOne as jest.Mock).mockResolvedValue({});

    await expect(service.createClient({ email: "a", nationalId: "1" })).rejects.toThrow(
      "Cliente ya existe",
    );
  });

  // =============================
  // REQUEST ACCESS
  // =============================
  it("should send token", async () => {
    (Client.findOne as jest.Mock).mockResolvedValue({
      save: jest.fn(),
    });

    await service.requestAccess("a");

    expect(createSendTokenClient).toHaveBeenCalled();
  });

  it("should throw if not found", async () => {
    (Client.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.requestAccess("a")).rejects.toThrow("Cliente no encontrado");
  });

  // =============================
  // CHANGE PASSWORD
  // =============================
  it("should change password", async () => {
    const saveMock = jest.fn();

    (Client.findById as jest.Mock).mockResolvedValue({
      password: "hashed",
      save: saveMock,
    });

    (checkPassword as jest.Mock).mockResolvedValue(true);
    (hashPassword as jest.Mock).mockResolvedValue("new");

    await service.changePassword("1", "old", "new");

    expect(saveMock).toHaveBeenCalled();
  });
});
