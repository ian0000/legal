import * as controller from "../finance-transactions.controller";

import * as service from "../finance-transactions.service";

jest.mock("../finance-transactions.service");

describe("Finance Transactions Controller", () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createFinanceTransaction", () => {
    it("should create transaction", async () => {
      const req: any = {
        user: {
          id: "user-1",
        },

        body: {
          title: "Internet",
        },
      };

      await controller.createFinanceTransaction(req, res, next);

      expect(service.createFinanceTransaction).toHaveBeenCalledWith("user-1", req.body);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("getFinanceTransactions", () => {
    it("should return transactions", async () => {
      const req: any = {};

      await controller.getFinanceTransactions(req, res, next);

      expect(service.getFinanceTransactions).toHaveBeenCalled();
    });
  });

  describe("updateFinanceTransaction", () => {
    it("should update transaction", async () => {
      const req: any = {
        user: {
          id: "user-1",
        },

        params: {
          transactionId: "transaction-1",
        },

        body: {
          amount: 100,
        },
      };

      await controller.updateFinanceTransaction(req, res, next);

      expect(service.updateFinanceTransaction).toHaveBeenCalledWith(
        "user-1",
        "transaction-1",
        req.body,
      );
    });
  });

  describe("deleteFinanceTransaction", () => {
    it("should delete transaction", async () => {
      const req: any = {
        user: {
          id: "user-1",
        },

        params: {
          transactionId: "transaction-1",
        },
      };

      await controller.deleteFinanceTransaction(req, res, next);

      expect(service.deleteFinanceTransaction).toHaveBeenCalledWith("user-1", "transaction-1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
