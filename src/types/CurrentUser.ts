export enum AnalyticProfile {
  CRA = "cra",
  UNKNOWN = "unknown",
  PI = "pi",
  PATIENT_RECRUITER = "patient-recruiter",
  REIFY_EMPLOYEE = "reify-employee",
  CRC = "crc",
  CPTM = "cptm",
  SITE_DIRECTOR = "site-director",
  CRO = "cro",
  CTPM = "ctpm",
}

export type CurrentUser = {
  id: string;
  email: string;
  inactive: boolean;
  country: string;
  "nick-name": string;
  "consent-ids": string[];
  "last-name": string;
  "last-logged-out"?: Date;
  "analytics-profile": AnalyticProfile;
  "idp-id": string;
  "last-seen": Date;
  "is-pseudo": boolean;
  "email-verified": boolean;
  "full-name": string;
  "launchdarkly-hash": string;
  "is-persona-switching-enabled": boolean;
  "created-at": Date;
};
