export const CASE_STATUS = {
  ACTIVE: "active",
  PAUSED: "paused",
  DELAYED: "delayed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type CaseStatus = (typeof CASE_STATUS)[keyof typeof CASE_STATUS];

export const CASE_STATUS_VALUES = Object.values(CASE_STATUS) as [CaseStatus, ...CaseStatus[]];

export const CASE_STAGE_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  REVIEW: "review",
  BLOCKED: "blocked",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type CaseStageStatus = (typeof CASE_STAGE_STATUS)[keyof typeof CASE_STAGE_STATUS];

export const CASE_STAGE_STATUS_VALUES = Object.values(CASE_STAGE_STATUS) as [
  CaseStageStatus,
  ...CaseStageStatus[],
];
