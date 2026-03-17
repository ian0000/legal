import { USER_ROLES, UserRole } from "@legal/shared/types/roles";

export const PERMISSIONS: Record<string, UserRole[]> = {
  UPDATE_USER: [USER_ROLES.OWNER],
  CREATE_CASE: [USER_ROLES.OWNER, USER_ROLES.LAWYER],
  VIEW_CASE: [USER_ROLES.OWNER, USER_ROLES.LAWYER, USER_ROLES.INTERN],
} as const;

export type Permission = keyof typeof PERMISSIONS;
