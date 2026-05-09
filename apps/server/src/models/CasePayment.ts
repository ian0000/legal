import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface CasePayment {
  caseId: Types.ObjectId;

  amount: number;

  type: "income" | "expense";

  category: string;

  method: "cash" | "transfer" | "card" | "check" | "other";

  status: "pending" | "completed" | "cancelled";

  description?: string;

  reference?: string;

  attachments?: Types.ObjectId[];

  paymentDate: Date;

  registeredBy: Types.ObjectId;

  updatedBy?: Types.ObjectId;

  deletedBy?: Types.ObjectId;

  affectsGlobalFinance: boolean;

  financeTransactionId?: Types.ObjectId;

  isDeleted: boolean;

  deletedAt?: Date;
}

const CasePaymentSchema = new Schema<CasePayment>(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    method: {
      type: String,
      enum: ["cash", "transfer", "card", "check", "other"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "completed",
      index: true,
    },

    description: {
      type: String,
    },

    reference: {
      type: String,
      trim: true,
    },

    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Document",
      },
    ],

    paymentDate: {
      type: Date,
      default: Date.now,
      index: true,
    },

    registeredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    affectsGlobalFinance: {
      type: Boolean,
      default: true,
    },

    financeTransactionId: {
      type: Schema.Types.ObjectId,
      ref: "FinanceTransaction",
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

CasePaymentSchema.index({
  caseId: 1,
  type: 1,
  status: 1,
  paymentDate: -1,
});

const CasePayment = mongoose.model<CasePayment>("CasePayment", CasePaymentSchema);

export type CasePaymentDocument = HydratedDocument<CasePayment>;

export default CasePayment;
