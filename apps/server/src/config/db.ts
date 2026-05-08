import mongoose from "mongoose";
import { env } from "./env";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(env.DATABASE_URL);

  isConnected = true;

  console.log(`Mongo connected (${env.NODE_ENV})`);
};

export const disconnectDB = async (): Promise<void> => {
  if (!isConnected) return;

  await mongoose.disconnect();

  isConnected = false;
};
