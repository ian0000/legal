import { TOKEN_TYPES } from "@legal/shared/src/types/tokens";
import mongoose, { Schema, Types } from "mongoose";

export interface IVerificationToken {
  token: string;
  type: TOKEN_TYPES;
  user: Types.ObjectId;
  createdAt: Date;
  usedAt?: Date;
}

const verificationTokenSchema = new Schema<IVerificationToken>({
  token: {
    type: String,
    required: true,
    index: true,
  },

  type: {
    type: String,
    enum: Object.values(TOKEN_TYPES),
    required: true,
    index: true,
  },

  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  usedAt: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

const VerificationToken = mongoose.model<IVerificationToken>(
  "VerificationToken",
  verificationTokenSchema,
);

export default VerificationToken;
