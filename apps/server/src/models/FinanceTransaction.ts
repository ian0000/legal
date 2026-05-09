import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface FinanceTransaction {
  title: string;

  description?: string;

  amount: number;

  type: "income" | "expense";

  category: string;

  method: "cash" | "transfer" | "card" | "check" | "other";

  status: "pending" | "completed" | "cancelled";

  reference?: string;

  attachments?: Types.ObjectId[];

  transactionDate: Date;

  registeredBy: Types.ObjectId;

  updatedBy?: Types.ObjectId;

  deletedBy?: Types.ObjectId;

  relatedCaseId?: Types.ObjectId;

  sourceType: "manual" | "case_payment";

  isDeleted: boolean;

  deletedAt?: Date;
}

const FinanceTransactionSchema = new Schema<FinanceTransaction>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
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
      default: "cash",
    },

    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "completed",
    },

    reference: {
      type: String,
    },

    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Document",
      },
    ],

    transactionDate: {
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

    relatedCaseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
    },

    sourceType: {
      type: String,
      enum: ["manual", "case_payment"],
      default: "manual",
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

FinanceTransactionSchema.index({
  type: 1,
  category: 1,
  transactionDate: -1,
});

const FinanceTransaction = mongoose.model<FinanceTransaction>(
  "FinanceTransaction",
  FinanceTransactionSchema,
);

export type FinanceTransactionDocument = HydratedDocument<FinanceTransaction>;

export default FinanceTransaction;
