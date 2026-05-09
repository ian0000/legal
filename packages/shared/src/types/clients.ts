export enum CLIENT_TYPES {
  PERSON = "PERSON",
  COMPANY = "COMPANY",
}

export type ClientType =
  (typeof CLIENT_TYPES)[keyof typeof CLIENT_TYPES];
