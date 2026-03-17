import request from "supertest";
import { app } from "../app";

describe("GET /health", () => {
  it("should return ok", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
  });
});
