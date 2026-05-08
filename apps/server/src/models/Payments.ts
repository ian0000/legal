import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface Payment {
  caseId: Types.ObjectId;

  amount: number;

  type: string;

  method: string;

  description?: string;

  registeredBy: Types.ObjectId;

  paymentDate: Date;
}

const PaymentSchema = new Schema<Payment>(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    registeredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model<Payment>("Payment", PaymentSchema);

export type PaymentDocument = HydratedDocument<Payment>;

export default Payment;
