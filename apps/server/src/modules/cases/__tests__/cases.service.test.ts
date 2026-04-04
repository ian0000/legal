import Case, { ICase } from "@/models/Case";
import * as service from "../cases.service";
import { Types } from "mongoose";

jest.mock("@/models/Case");

describe("Case Service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create case correctly", async () => {
    (Case.create as jest.Mock).mockResolvedValue({});

    const data = {
      title: "Test",
      responsibleUser: new Types.ObjectId(),
    };

    const result = await service.createCase(data);

    expect(Case.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test",
        history: expect.any(Array),
      }),
    );

    expect(result).toBeDefined();
  });

  it("getAllCases", async () => {
    (Case.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnThis(),
    });

    await service.getAllCases();

    expect(Case.find).toHaveBeenCalled();
  });

  it("getCaseById", async () => {
    (Case.findById as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnThis(),
    });

    await service.getCaseById("1");

    expect(Case.findById).toHaveBeenCalled();
  });

  it("updateCase", async () => {
    const saveMock = jest.fn();

    (Case.findById as jest.Mock).mockResolvedValue({
      history: [],
      save: saveMock,
    });

    await service.updateCase("1", {}, "user" as any);

    expect(saveMock).toHaveBeenCalled();
  });

  it("updateStatus", async () => {
    const saveMock = jest.fn();

    (Case.findById as jest.Mock).mockResolvedValue({
      history: [],
      save: saveMock,
    });

    await service.updateStatus("1", "completed", "user" as any);

    expect(saveMock).toHaveBeenCalled();
  });

  it("deleteCase", async () => {
    (Case.findByIdAndDelete as jest.Mock).mockResolvedValue({});

    await service.deleteCase("1");

    expect(Case.findByIdAndDelete).toHaveBeenCalled();
  });
});
