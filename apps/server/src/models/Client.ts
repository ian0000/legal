import mongoose, { HydratedDocument, Schema } from "mongoose";

export interface Client {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  nationalId: string;
  isConfirmed: boolean;
  isActive: boolean;
  lastAccessRequest: Date;
}

export interface CreateClientDTO {
  name: string;
  nationalId: string;
  phone?: string;
  address?: string;
  email?: string;
}

export interface ActivateClientLoginDTO {
  email: string;
  password: string;
}

export interface ClientLoginDTO {
  email: string;
  password: string;
}

const clientSchema = new Schema<Client>(
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
      select: false,
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
    lastAccessRequest: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Client = mongoose.model<Client>("Client", clientSchema);

export type ClientDocument = HydratedDocument<Client>;
export default Client;
