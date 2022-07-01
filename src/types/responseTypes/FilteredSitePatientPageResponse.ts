import { SiteTrialPatientStageType } from "types/PatientAggregate";

export type FilteredSitePatientPageResponse = {
  limit: number;
  offset: number;
  totalResults: number;
  sitePatients: Array<FilteredSitePatient>;
};

export type filteredSiteTrialPatientLabel = {
  id?: string;
  title?: string;
  color?: string;
};

export type filteredSiteTrialPatient = {
  id: string;
  stage: SiteTrialPatientStageType;
  starred?: boolean | null;
  subjectId?: string | null;
  patientSource: null;
  siteTrial?: {
    id: string;
    name: string;
  };
  labels: Array<filteredSiteTrialPatientLabel>;
};

export type FilteredSitePatient = {
  id: string;
  createdAt: Date;
  patient: {
    id: string;
    name: string;
    dob?: Date | null;
    email?: string | null;
    gender?: string | null;
    phoneNumber?: {
      number?: string | null;
      type?: string | null;
    };
  };
  siteTrialPatients: Array<filteredSiteTrialPatient>;
};
