import * as controller from "../cases.controller";
import * as service from "../cases.service";

jest.mock("../cases.service");

describe("Case Controller", () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createCase", async () => {
    await controller.createCase({ body: {} } as any, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("getAllCases", async () => {
    await controller.getAllCases({} as any, res, next);

    expect(res.json).toHaveBeenCalled();
  });

  it("getCaseById", async () => {
    await controller.getCaseById({ params: { id: "1" } } as any, res, next);

    expect(res.json).toHaveBeenCalled();
  });

  it("updateCase", async () => {
    await controller.updateCase(
      { params: { id: "1" }, body: {}, user: { id: "1" } } as any,
      res,
      next,
    );

    expect(res.json).toHaveBeenCalled();
  });

  it("updateStatus", async () => {
    await controller.updateStatus(
      { params: { id: "1" }, body: { status: "completed" }, user: { id: "1" } } as any,
      res,
      next,
    );

    expect(res.json).toHaveBeenCalled();
  });

  it("deleteCase", async () => {
    await controller.deleteCase({ params: { id: "1" } } as any, res, next);

    expect(res.json).toHaveBeenCalled();
  });
});
