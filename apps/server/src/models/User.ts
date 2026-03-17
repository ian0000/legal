import mongoose, { Document, HydratedDocument, Schema } from "mongoose";
import { USER_ROLES, UserRole } from "@legal/shared/types/roles";

interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isConfirmed: boolean;
  isActive: boolean;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
}
export interface UpdateUserByOwnerDTO {
  role?: UserRole;
  isActive?: boolean;
}

export interface UpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

const UserSchema = new Schema<User>(
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
  },
  { timestamps: true },
);

const User = mongoose.model<User>("User", UserSchema);

export type UserDocument = HydratedDocument<User>;
export default User;
