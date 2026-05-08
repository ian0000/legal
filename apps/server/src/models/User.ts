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

  profileImage?: string;

  permissions?: string[];

  createdBy?: Types.ObjectId;
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;

  email: string;

  role?: UserRole;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  cedula?: string;

  profileImage?: string;
}

export interface UpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
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
      required: true,
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
      type: String,
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

UserSchema.index({ email: 1 });

const User = mongoose.model<User>("User", UserSchema);

export type UserDocument = HydratedDocument<User>;

export default User;
