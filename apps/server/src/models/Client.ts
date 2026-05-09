import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface Client {
  firstName: string;

  lastName: string;

  cedula: string;

  email?: string;

  phone?: string;

  address?: string;

  notes?: string;

  userId?: Types.ObjectId;

  isActive: boolean;

  createdBy: Types.ObjectId;
}

const ClientSchema = new Schema<Client>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    cedula: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
      index: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
    },

    /**
     * Relación opcional con User
     * para acceso al portal del cliente
     */

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      sparse: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);
/**
 * Búsqueda rápida
 */

ClientSchema.index({
  firstName: "text",
  lastName: "text",
  cedula: "text",
  email: "text",
});

/**
 * Nombre completo virtual
 */

ClientSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

ClientSchema.set("toJSON", {
  virtuals: true,
});

ClientSchema.set("toObject", {
  virtuals: true,
});

const Client = mongoose.model<Client>("Client", ClientSchema);

export type ClientDocument = HydratedDocument<Client>;

export default Client;
