import Client from "../../../models/Client";
import User from "../../../models/User";
import Case from "../../../models/Case";

import * as clientService from "../clients.service";

import { createVerificationToken } from "../../../utils/verification-token";

import { AuthEmail } from "../../auth/auth.email.service";
import { CASE_STATUS } from "@legal/shared/src/types/cases";

jest.mock("../../../models/Client");
jest.mock("../../../models/User");
jest.mock("../../../models/Case");

jest.mock("../../../utils/verification-token");

jest.mock("../../auth/auth.email.service");

describe("Client Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================
  // CREATE CLIENT
  // =====================================

  describe("createClient", () => {
    it("should create client correctly", async () => {
      (Client.findOne as jest.Mock).mockResolvedValue(null);

      (User.findOne as jest.Mock).mockResolvedValue(null);

      (User.create as jest.Mock).mockResolvedValue({
        _id: "user-id",
        email: "client@test.com",
        firstName: "Ian",
        lastName: "Mena",
      });

      (Client.create as jest.Mock).mockResolvedValue({
        _id: "client-id",
      });

      (createVerificationToken as jest.Mock).mockResolvedValue({
        rawToken: "token",
      });

      await clientService.createClient(
        {
          firstName: "Ian",
          lastName: "Mena",
          cedula: "1234567890",
          email: "client@test.com",
        } as any,
        "admin-id",
      );

      expect(User.create).toHaveBeenCalled();

      expect(Client.create).toHaveBeenCalled();

      expect(createVerificationToken).toHaveBeenCalled();

      expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalled();
    });

    it("should throw if client already exists", async () => {
      (Client.findOne as jest.Mock).mockResolvedValue({});

      await expect(
        clientService.createClient(
          {
            cedula: "123",
          } as any,
          "admin-id",
        ),
      ).rejects.toThrow("Ya existe un cliente con esta cédula");
    });
  });

  // =====================================
  // GET CLIENT BY ID
  // =====================================

  describe("getClientById", () => {
    it("should return client", async () => {
      const leanMock = jest.fn().mockResolvedValue({
        _id: "1",
      });

      const populateMock = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          lean: leanMock,
        }),
      });

      (Client.findById as jest.Mock).mockReturnValue({
        populate: populateMock,
      });

      const result = await clientService.getClientById("507f1f77bcf86cd799439011");

      expect(result).toBeDefined();
    });
  });

  // =====================================
  // UPDATE CLIENT
  // =====================================

  describe("updateClient", () => {
    it("should update client", async () => {
      const saveMock = jest.fn();

      (Client.findById as jest.Mock).mockResolvedValue({
        _id: "1",
        cedula: "old",
        email: "old@test.com",
        save: saveMock,
      });

      (Client.findOne as jest.Mock).mockResolvedValue(null);

      await clientService.updateClient("507f1f77bcf86cd799439011", {
        firstName: "Updated",
      });

      expect(saveMock).toHaveBeenCalled();
    });
  });

  // =====================================
  // DELETE CLIENT
  // =====================================

  describe("deleteClient", () => {
    it("should soft delete client", async () => {
      const saveMock = jest.fn();

      (Client.findById as jest.Mock).mockResolvedValue({
        isActive: true,
        save: saveMock,
      });

      const result = await clientService.deleteClient("507f1f77bcf86cd799439011");

      expect(saveMock).toHaveBeenCalled();

      expect(result).toEqual({
        message: "Cliente desactivado correctamente",
      });
    });
  });

  // =====================================
  // GET CLIENT CASES
  // =====================================

  describe("getClientCases", () => {
    it("should return cases", async () => {
      const leanMock = jest.fn().mockResolvedValue([]);

      const sortMock = jest.fn().mockReturnValue({
        lean: leanMock,
      });

      const populateStageMock = jest.fn().mockReturnValue({
        sort: sortMock,
      });

      const populateLawyerMock = jest.fn().mockReturnValue({
        populate: populateStageMock,
      });

      (Case.find as jest.Mock).mockReturnValue({
        populate: populateLawyerMock,
      });

      const result = await clientService.getClientCases("507f1f77bcf86cd799439011");

      expect(result).toEqual([]);
    });
  });

  // =====================================
  // GET CLIENT STATS
  // =====================================

  describe("getClientStats", () => {
    it("should return stats", async () => {
      (Case.find as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue([
          {
            status: CASE_STATUS.ACTIVE,
            financialSummary: {
              totalPaid: 100,
              pendingAmount: 50,
            },
          },

          {
            status: CASE_STATUS.COMPLETED,
            financialSummary: {
              totalPaid: 200,
              pendingAmount: 0,
            },
          },
        ]),
      });

      const result = await clientService.getClientStats("507f1f77bcf86cd799439011");

      expect(result).toEqual({
        totalCases: 2,
        activeCases: 1,
        completedCases: 1,
        totalPaid: 300,
        pendingAmount: 50,
      });
    });
  });
});
