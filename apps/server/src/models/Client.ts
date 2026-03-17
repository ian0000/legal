import mongoose, { Schema } from "mongoose";

export interface IClient {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  nationalId: string;
  isConfirmed: boolean;
  isActive: boolean;
}

const clientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
      unique: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Client = mongoose.model<IClient>("Client", clientSchema);

export default Client;
