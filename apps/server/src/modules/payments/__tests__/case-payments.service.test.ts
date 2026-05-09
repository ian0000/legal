import CasePayment from "../../../models/CasePayment";
import Case from "../../../models/Case";
import FinanceTransaction from "../../../models/FinanceTransaction";
import Activity from "../../../models/Activities";

import * as casePaymentsService from "../case-payments.service";

jest.mock("../../../models/CasePayment");
jest.mock("../../../models/Case");
jest.mock("../../../models/FinanceTransaction");
jest.mock("../../../models/Activities");

describe("Case Payments Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createCasePayment", () => {
    it("should create case payment", async () => {
      (Case.findById as jest.Mock).mockResolvedValue({
        _id: "case-1",
      });

      (CasePayment.find as jest.Mock).mockResolvedValue([]);

      const saveMock = jest.fn();

      (CasePayment.create as jest.Mock).mockResolvedValue({
        _id: "payment-1",
        caseId: "case-1",
        amount: 100,
        type: "income",
        category: "legal_fee",
        method: "cash",
        status: "completed",
        affectsGlobalFinance: false,
        save: saveMock,
      });

      (Case.findById as jest.Mock).mockResolvedValue({
        financialSummary: {
          totalCost: 0,
        },
        save: saveMock,
      });

      const result = await casePaymentsService.createCasePayment("user-1", {
        caseId: "case-1",
        amount: 100,
        type: "income",
        category: "legal_fee",
        method: "cash",
      });

      expect(result).toBeDefined();
    });
  });

  describe("getCasePaymentById", () => {
    it("should return payment", async () => {
      (CasePayment.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue({
          _id: "payment-1",
        }),
      });

      const result = await casePaymentsService.getCasePaymentById("payment-1");

      expect(result).toBeDefined();
    });
  });

  describe("updateCasePayment", () => {
    it("should update payment", async () => {
      const saveMock = jest.fn();

      (CasePayment.findOne as jest.Mock).mockResolvedValue({
        _id: "payment-1",
        amount: 100,
        type: "income",
        category: "legal_fee",
        method: "cash",
        status: "completed",
        caseId: "case-1",
        save: saveMock,
      });

      (CasePayment.find as jest.Mock).mockResolvedValue([]);

      (Case.findById as jest.Mock).mockResolvedValue({
        financialSummary: {
          totalCost: 0,
        },
        save: saveMock,
      });

      await casePaymentsService.updateCasePayment("user-1", "payment-1", {
        amount: 200,
      });

      expect(saveMock).toHaveBeenCalled();

      expect(Activity.create).toHaveBeenCalled();
    });
  });

  describe("deleteCasePayment", () => {
    it("should soft delete payment", async () => {
      const saveMock = jest.fn();

      (CasePayment.findOne as jest.Mock).mockResolvedValue({
        _id: "payment-1",
        caseId: "case-1",
        save: saveMock,
      });

      (CasePayment.find as jest.Mock).mockResolvedValue([]);

      (Case.findById as jest.Mock).mockResolvedValue({
        financialSummary: {
          totalCost: 0,
        },
        save: saveMock,
      });

      await casePaymentsService.deleteCasePayment("user-1", "payment-1");

      expect(saveMock).toHaveBeenCalled();

      expect(Activity.create).toHaveBeenCalled();
    });
  });
});
