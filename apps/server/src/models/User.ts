import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

import { USER_ROLES, UserRole } from "@legal/shared/src/types/roles";

export interface User {
  firstName: string;
  lastName: string;

  email: string;
  password: string;

  phone?: string;
  cedula?: string;

  role: UserRole;

  isConfirmed: boolean;
  isActive: boolean;

  profileImage?: {
    data: Buffer;
    contentType: string;
    filename?: string;
    uploadedAt?: Date;
  };

  permissions?: string[];

  createdBy?: Types.ObjectId;
}

const UserSchema = new Schema<User>(
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

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false,
      default: null,
    },

    phone: {
      type: String,
    },

    cedula: {
      type: String,
      index: true,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.LAWYER,
      required: true,
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    profileImage: {
      data: {
        type: Buffer,
      },

      contentType: {
        type: String,
      },

      filename: {
        type: String,
      },

      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },

    permissions: [
      {
        type: String,
      },
    ],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<User>("User", UserSchema);

export type UserDocument = HydratedDocument<User>;

export default User;
