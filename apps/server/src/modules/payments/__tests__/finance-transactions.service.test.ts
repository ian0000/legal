import FinanceTransaction from "../../../models/FinanceTransaction";

import Activity from "../../../models/Activities";

import * as financeTransactionsService from "../finance-transactions.service";

jest.mock("../../../models/FinanceTransaction");
jest.mock("../../../models/Activities");

describe("Finance Transactions Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createFinanceTransaction", () => {
    it("should create transaction", async () => {
      (FinanceTransaction.create as jest.Mock).mockResolvedValue({
        _id: "transaction-1",
      });

      const result = await financeTransactionsService.createFinanceTransaction("user-1", {
        title: "Internet",
        amount: 50,
        type: "expense",
        category: "utilities",
      });

      expect(FinanceTransaction.create).toHaveBeenCalled();

      expect(Activity.create).toHaveBeenCalled();

      expect(result).toBeDefined();
    });
  });

  describe("getFinanceTransactionById", () => {
    it("should return transaction", async () => {
      (FinanceTransaction.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue({
          _id: "transaction-1",
        }),
      });

      const result = await financeTransactionsService.getFinanceTransactionById("transaction-1");

      expect(result).toBeDefined();
    });
  });

  describe("updateFinanceTransaction", () => {
    it("should update transaction", async () => {
      const saveMock = jest.fn();

      (FinanceTransaction.findOne as jest.Mock).mockResolvedValue({
        _id: "transaction-1",
        amount: 50,
        save: saveMock,
      });

      await financeTransactionsService.updateFinanceTransaction("user-1", "transaction-1", {
        amount: 100,
      });

      expect(saveMock).toHaveBeenCalled();

      expect(Activity.create).toHaveBeenCalled();
    });
  });

  describe("deleteFinanceTransaction", () => {
    it("should soft delete transaction", async () => {
      const saveMock = jest.fn();

      (FinanceTransaction.findOne as jest.Mock).mockResolvedValue({
        _id: "transaction-1",
        save: saveMock,
      });

      await financeTransactionsService.deleteFinanceTransaction("user-1", "transaction-1");

      expect(saveMock).toHaveBeenCalled();

      expect(Activity.create).toHaveBeenCalled();
    });
  });
});
