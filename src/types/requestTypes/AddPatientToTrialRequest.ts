import { SiteTrialPatientStage } from "types/PatientAggregate";

export type AddPatientToTrialRequest = {
  "site-trial-ids": Array<string>;
  stage: SiteTrialPatientStage;
  "site-patient-ids": Array<string>;
};
