import { SiteTrialPatient } from "./SiteTrialPatient";

export enum SiteTrialPatientStage {
  SCREEN_FAILURE = "screen-failure",
  COMPLETED = "completed",
  DISCONTINUED = "discontinued",
  FIRST_VISIT_SCHEDULED = "first-visit-scheduled",
  PRE_SCREENING = "pre-screening",
  IN_SCREENING = "in-screening",
  ENROLLED = "enrolled",
  POTENTIAL_CANDIDATE = "potential-candidate",
  ARCHIVE = "archive",
}

export type SiteTrialPatientStageType = `${SiteTrialPatientStage}`;

export type SitePatient = {
  "bulk-import-payload-id": string;
  "batch-id": string;
  mrn: string;
  id: string;
  "site-id": string;
  "patient-id": string;
  "created-at": Date;
  "owner-id": string;
};

export type Patient = {
  "updated-at": Date;
  address: string;
  email: string;
  "preferred-pronouns-notes": string;
  "preferred-pronouns": string;
  name: string;
  "accessibility-reqs-notes": string;
  nickname: null | string;
  "employment-status": string;
  id: string;
  "owner-id": string;
  gender: string;
  hobbies: string;
  "created-at": Date;
  "restrict-processing": boolean;
};

export type PatientAggregate = {
  id: string;
  "site-trial-patient": SiteTrialPatient;
  "site-patient": SitePatient;
  patient: Patient;
};
