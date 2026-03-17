export const USER_ROLES = { OWNER: "owner", LAWYER: "lawyer", INTERN: "intern" } as const;
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
