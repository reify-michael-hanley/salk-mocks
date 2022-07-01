import { SiteTrialPatientStageType } from "./PatientAggregate";

export type SiteTrialPatient = {
  id: string;
  "site-patient-id": string;
  "site-trial-id": string;
  stage: SiteTrialPatientStageType;
  "created-at": Date;
  "owner-id": string;
  "patient-number": string;
  "updated-at"?: Date | null;
  acknowledged?: boolean | null;
  "acknowledged-at"?: Date | null;
  starred?: boolean | null;
  "patient-source-id"?: string | null;
  "subject-id"?: string | null;
  "pre-screen-fail-reason"?: string | null;
  "planned-screening-date"?: Date | null;
  "date-consent-signed"?: Date | null;
  "consent-form-version"?: null;
  "screen-fail-reason"?: null;
  "date-enrolled"?: Date | null;
  "patient-log-comments"?: string | null;
  "referral-patient-id"?: string | null;
  "reasons-not-screened"?: string | null;
};
