import { SiteTrialPatientStageType } from "types/PatientAggregate";

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  INTERSEX = "Intersex",
}

export type FilteredSitePatientPageResponse = {
  limit: number;
  offset: number;
  totalResults: number;
  sitePatients: Array<FilteredSitePatient>;
};

export type FilteredSiteTrialPatientLabel = {
  id?: string;
  title?: string;
  color?: string;
};

export type FilteredSiteTrialPatient = {
  id: string;
  stage: SiteTrialPatientStageType;
  starred?: boolean | null;
  subjectId?: string | null;
  patientSource: null;
  siteTrial?: {
    id: string;
    name: string;
  };
  labels: Array<FilteredSiteTrialPatientLabel>;
};

export type FilteredSitePatient = {
  id: string;
  createdAt: Date;
  patient: {
    id: string;
    name: string;
    dob?: Date | null;
    email?: string | null;
    gender?: `${Gender}` | null;
    phoneNumber?: {
      number?: string | null;
      type?: string | null;
    };
  };
  siteTrialPatients: Array<FilteredSiteTrialPatient>;
};
