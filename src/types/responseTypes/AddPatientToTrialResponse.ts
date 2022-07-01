import { SiteTrialPatient } from "types/SiteTrialPatient";

export type AddPatientToTrialResponse = {
  "site-trial-patients": SiteTrialPatient[];
  "site-trial-ids": string[];
  "site-trial-patient-changes": {
    created: number;
    updated: number;
    "no-op": number;
  };
};
