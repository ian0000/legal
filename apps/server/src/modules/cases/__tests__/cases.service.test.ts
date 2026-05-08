// src/modules/cases/__tests__/cases.service.test.ts

import Case from "../../../models/Case";
import Client from "../../../models/Client";
import User from "../../../models/User";
import Activity from "../../../models/Activities";

import * as casesService from "../cases.service";

jest.mock("../../../models/Case");

jest.mock("../../../models/Client");

jest.mock("../../../models/User");

jest.mock("../../../models/Activities");

describe("Cases Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================
  // CREATE CASE
  // =====================================

  describe("createCase", () => {
    it("should create case correctly", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue(null);

      (Client.findById as jest.Mock).mockResolvedValue({
        _id: "client-id",
      });

      (User.findById as jest.Mock).mockResolvedValue({
        _id: "lawyer-id",
      });

      (User.find as jest.Mock).mockResolvedValue([
        {
          _id: "assigned-user",
        },
      ]);

      (Case.create as jest.Mock).mockResolvedValue({
        _id: "case-id",

        code: "CASE-001",
      });

      (Activity.create as jest.Mock).mockResolvedValue({});

      const result = await casesService.createCase({
        code: "CASE-001",

        title: "Caso prueba",

        clientId: "client-id",

        principalLawyerId: "lawyer-id",

        assignedUsers: ["assigned-user"],

        createdBy: "user-id",
      });

      expect(Case.create).toHaveBeenCalled();

      expect(Activity.create).toHaveBeenCalled();

      expect(result).toBeDefined();
    });

    it("should throw if case code already exists", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue({});

      await expect(
        casesService.createCase({
          code: "CASE-001",

          title: "Caso",

          clientId: "client-id",

          principalLawyerId: "lawyer-id",

          createdBy: "user-id",
        }),
      ).rejects.toThrow("Ya existe un caso con ese código");
    });

    it("should throw if client does not exist", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue(null);

      (Client.findById as jest.Mock).mockResolvedValue(null);

      await expect(
        casesService.createCase({
          code: "CASE-001",

          title: "Caso",

          clientId: "client-id",

          principalLawyerId: "lawyer-id",

          createdBy: "user-id",
        }),
      ).rejects.toThrow("Cliente no encontrado");
    });

    it("should throw if lawyer does not exist", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue(null);

      (Client.findById as jest.Mock).mockResolvedValue({
        _id: "client-id",
      });

      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(
        casesService.createCase({
          code: "CASE-001",

          title: "Caso",

          clientId: "client-id",

          principalLawyerId: "lawyer-id",

          createdBy: "user-id",
        }),
      ).rejects.toThrow("Abogado principal no encontrado");
    });

    it("should throw if assigned users do not exist", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue(null);

      (Client.findById as jest.Mock).mockResolvedValue({
        _id: "client-id",
      });

      (User.findById as jest.Mock).mockResolvedValue({
        _id: "lawyer-id",
      });

      (User.find as jest.Mock).mockResolvedValue([]);

      await expect(
        casesService.createCase({
          code: "CASE-001",

          title: "Caso",

          clientId: "client-id",

          principalLawyerId: "lawyer-id",

          assignedUsers: ["user-1"],

          createdBy: "user-id",
        }),
      ).rejects.toThrow("Uno o más usuarios asignados no existen");
    });

    it("should throw if code is empty", async () => {
      await expect(
        casesService.createCase({
          code: "",

          title: "Caso",

          clientId: "client-id",

          principalLawyerId: "lawyer-id",

          createdBy: "user-id",
        }),
      ).rejects.toThrow("El código es obligatorio");
    });

    it("should throw if title is empty", async () => {
      await expect(
        casesService.createCase({
          code: "CASE-001",

          title: "",

          clientId: "client-id",

          principalLawyerId: "lawyer-id",

          createdBy: "user-id",
        }),
      ).rejects.toThrow("El título es obligatorio");
    });
  });

  // =====================================
  // GET CASES
  // =====================================

  describe("getCases", () => {
    it("should return paginated cases", async () => {
      const limitMock = jest.fn().mockResolvedValue([]);

      const skipMock = jest.fn().mockReturnValue({
        limit: limitMock,
      });

      const sortMock = jest.fn().mockReturnValue({
        skip: skipMock,
      });

      const populate4 = jest.fn().mockReturnValue({
        sort: sortMock,
      });

      const populate3 = jest.fn().mockReturnValue({
        populate: populate4,
      });

      const populate2 = jest.fn().mockReturnValue({
        populate: populate3,
      });

      const populate1 = jest.fn().mockReturnValue({
        populate: populate2,
      });

      (Case.find as jest.Mock).mockReturnValue({
        populate: populate1,
      });

      (Case.countDocuments as jest.Mock).mockResolvedValue(0);

      const result = await casesService.getCases();

      expect(result).toEqual({
        data: [],

        pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
      });
    });
  });

  // =====================================
  // GET CASE BY ID
  // =====================================

  describe("getCaseById", () => {
    it("should return case by id", async () => {
      const populateMock = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue({
              _id: "case-id",
            }),
          }),
        }),
      });

      (Case.findOne as jest.Mock).mockReturnValue({
        populate: populateMock,
      });

      const result = await casesService.getCaseById("case-id");

      expect(result).toBeDefined();
    });

    it("should throw if case does not exist", async () => {
      const populateMock = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue(null),
          }),
        }),
      });

      (Case.findOne as jest.Mock).mockReturnValue({
        populate: populateMock,
      });

      await expect(casesService.getCaseById("invalid-id")).rejects.toThrow("Caso no encontrado");
    });
  });

  // =====================================
  // UPDATE CASE
  // =====================================

  describe("updateCase", () => {
    it("should update case", async () => {
      const saveMock = jest.fn();

      (Case.findOne as jest.Mock).mockResolvedValue({
        _id: "case-id",

        code: "CASE-001",

        status: "ACTIVE",

        createdBy: "user-id",

        save: saveMock,
      });

      (Activity.create as jest.Mock).mockResolvedValue({});

      const result = await casesService.updateCase("1", {
        title: "New",
      });

      expect(saveMock).toHaveBeenCalled();

      expect(Activity.create).toHaveBeenCalled();

      expect(result).toBeDefined();
    });

    it("should throw if case does not exist", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        casesService.updateCase("invalid-id", {
          title: "New",
        }),
      ).rejects.toThrow("Caso no encontrado");
    });
  });

  // =====================================
  // DELETE CASE
  // =====================================

  describe("deleteCase", () => {
    it("should soft delete case", async () => {
      const saveMock = jest.fn();

      (Case.findOne as jest.Mock).mockResolvedValue({
        _id: "case-id",

        code: "CASE-001",

        isDeleted: false,

        save: saveMock,
      });

      (Activity.create as jest.Mock).mockResolvedValue({});

      const result = await casesService.deleteCase("case-id", "user-id");

      expect(saveMock).toHaveBeenCalled();

      expect(Activity.create).toHaveBeenCalled();

      expect(result).toEqual({
        message: "Caso eliminado correctamente",
      });
    });

    it("should throw if case does not exist", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue(null);

      await expect(casesService.deleteCase("invalid-id", "user-id")).rejects.toThrow(
        "Caso no encontrado",
      );
    });
  });
});
