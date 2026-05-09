import * as controller from "../case-payments.controller";

import * as service from "../case-payments.service";

jest.mock("../case-payments.service");

describe("Case Payments Controller", () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createCasePayment", () => {
    it("should create payment", async () => {
      const req: any = {
        user: {
          id: "user-1",
        },

        body: {
          amount: 100,
        },
      };

      await controller.createCasePayment(req, res, next);

      expect(service.createCasePayment).toHaveBeenCalledWith("user-1", req.body);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("getCasePayments", () => {
    it("should return payments", async () => {
      const req: any = {
        params: {
          caseId: "case-1",
        },
      };

      await controller.getCasePayments(req, res, next);

      expect(service.getCasePayments).toHaveBeenCalledWith("case-1");
    });
  });

  describe("updateCasePayment", () => {
    it("should update payment", async () => {
      const req: any = {
        user: {
          id: "user-1",
        },

        params: {
          paymentId: "payment-1",
        },

        body: {
          amount: 200,
        },
      };

      await controller.updateCasePayment(req, res, next);

      expect(service.updateCasePayment).toHaveBeenCalledWith("user-1", "payment-1", req.body);
    });
  });

  describe("deleteCasePayment", () => {
    it("should delete payment", async () => {
      const req: any = {
        user: {
          id: "user-1",
        },

        params: {
          paymentId: "payment-1",
        },
      };

      await controller.deleteCasePayment(req, res, next);

      expect(service.deleteCasePayment).toHaveBeenCalledWith("user-1", "payment-1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
