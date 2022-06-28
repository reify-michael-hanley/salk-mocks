enum SiteTrialPatientStage {
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

export type SiteTrialPatient = {
  "stage-last-updated": Date | null;
  "updated-at": Date;
  "acknowledged-at": Date;
  "subject-id": string;
  stage: SiteTrialPatientStage;
  starred: boolean;
  "last-contact-attempt-date": Date;
  "planned-screening-date": Date;
  "site-patient-id": string;
  "date-consent-signed": Date;
  "patient-source-id": null | string;
  "screen-fail-reason": string;
  acknowledged: boolean;
  id: string;
  "site-trial-id": string;
  "patient-number": number;
  "owner-id": string;
  "contact-attempt-count": number;
  "date-enrolled": null | Date;
  "patient-log-comments": string;
  "pre-screen-fail-reason": string;
  "referral-patient-id": null | string;
  "consent-form-version": string;
  "created-at": Date;
};

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
