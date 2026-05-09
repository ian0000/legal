export const PAYMENT_METHODS = {
  CASH: "cash",
  TRANSFER: "transfer",
  CARD: "card",
  CHECK: "check",
  OTHER: "other",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;
