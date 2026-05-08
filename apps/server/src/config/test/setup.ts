import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../db";

jest.setTimeout(30000);

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await disconnectDB();
});
