export const USER_ROLES = {
  OWNER: "owner",
  LAWYER: "lawyer",
  INTERN: "intern",
  CLIENT: "client",
} as const;
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
