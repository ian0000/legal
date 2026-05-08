export const USER_ROLES = {
  OWNER: "owner",
  LAWYER: "lawyer",
  INTERN: "intern",
  CLIENT: "client",
} as const;
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const CASE_STATUS = {
  ACTIVE: "active",
  PAUSED: "paused",
  DELAYED: "delayed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;
export type CaseStatus = (typeof CASE_STATUS)[keyof typeof CASE_STATUS];

export const CASE_STAGE_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  REVIEW: "review",
  BLOCKED: "blocked",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type CaseStageStatus = (typeof CASE_STAGE_STATUS)[keyof typeof CASE_STAGE_STATUS];

export enum TOKEN_TYPES {
  ACCOUNT_SETUP = "ACCOUNT_SETUP",
  PASSWORD_RESET = "PASSWORD_RESET",
  EMAIL_CONFIRMATION = "EMAIL_CONFIRMATION",
}

export enum CLIENT_TYPES {
  PERSON = "PERSON",
  COMPANY = "COMPANY",
}

export type ClientType = (typeof CLIENT_TYPES)[keyof typeof CLIENT_TYPES];
