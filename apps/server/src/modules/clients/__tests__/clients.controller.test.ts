import * as controller from "../clients.controller";

import * as clientService from "../clients.service";

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

  // =====================================
  // CREATE CLIENT
  // =====================================

  describe("createClient", () => {
    it("should create client", async () => {
      const req: any = {
        body: {
          firstName: "Ian",
        },

        user: {
          id: "1",
        },
      };

      await controller.createClient(req, res, next);

      expect(clientService.createClient).toHaveBeenCalledWith(req.body, "1");

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  // =====================================
  // GET CLIENTS
  // =====================================

  describe("getClients", () => {
    it("should return clients", async () => {
      const req: any = {
        query: {},
      };

      await controller.getClients(req, res, next);

      expect(clientService.getClients).toHaveBeenCalled();
    });
  });

  // =====================================
  // GET CLIENT BY ID
  // =====================================

  describe("getClientById", () => {
    it("should return client", async () => {
      const req: any = {
        params: {
          id: "1",
        },
      };

      await controller.getClientById(req, res, next);

      expect(clientService.getClientById).toHaveBeenCalledWith("1");
    });
  });

  // =====================================
  // UPDATE CLIENT
  // =====================================

  describe("updateClient", () => {
    it("should update client", async () => {
      const req: any = {
        params: {
          id: "1",
        },

        body: {
          firstName: "Updated",
        },
      };

      await controller.updateClient(req, res, next);

      expect(clientService.updateClient).toHaveBeenCalledWith("1", req.body);
    });
  });

  // =====================================
  // DELETE CLIENT
  // =====================================

  describe("deleteClient", () => {
    it("should delete client", async () => {
      const req: any = {
        params: {
          id: "1",
        },
      };

      await controller.deleteClient(req, res, next);

      expect(clientService.deleteClient).toHaveBeenCalledWith("1");
    });
  });

  // =====================================
  // GET CLIENT CASES
  // =====================================

  describe("getClientCases", () => {
    it("should return client cases", async () => {
      const req: any = {
        params: {
          id: "1",
        },
      };

      await controller.getClientCases(req, res, next);

      expect(clientService.getClientCases).toHaveBeenCalledWith("1");
    });
  });

  // =====================================
  // GET CLIENT STATS
  // =====================================

  describe("getClientStats", () => {
    it("should return client stats", async () => {
      const req: any = {
        params: {
          id: "1",
        },
      };

      await controller.getClientStats(req, res, next);

      expect(clientService.getClientStats).toHaveBeenCalledWith("1");
    });
  });
});
