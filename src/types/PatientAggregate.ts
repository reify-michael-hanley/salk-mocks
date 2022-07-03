import { Patient } from "./Patient";
import { SitePatient } from "./SitePatient";
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

export type PatientAggregate = {
  id: string;
  "site-trial-patient": SiteTrialPatient;
  "site-patient": SitePatient;
  patient: Patient;
};
