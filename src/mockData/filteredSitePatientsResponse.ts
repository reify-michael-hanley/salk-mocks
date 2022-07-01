import { faker } from "@faker-js/faker";
import { SiteTrialPatientStage } from "types/PatientAggregate";
import {
  FilteredSitePatient,
  FilteredSitePatientPageResponse,
  FilteredSiteTrialPatient,
  Gender,
} from "types/responseTypes/FilteredSitePatientPageResponse";
import { RecursivePartial } from "utils/typeUtils";

const mockFilteredSiteTrialPatient = (
  overrides?: RecursivePartial<FilteredSiteTrialPatient>
): FilteredSiteTrialPatient => ({
  id: faker.datatype.uuid(),
  labels: [],
  patientSource: null,
  stage: faker.helpers.objectValue(SiteTrialPatientStage),
  starred: faker.datatype.boolean(),
  subjectId: null,
  ...overrides,
  siteTrial: {
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
    ...overrides?.siteTrial,
  },
});

const mockFilteredSiteTrialPatients = (
  overrides?: RecursivePartial<FilteredSiteTrialPatient[]>
) => {
  if (overrides) {
    return overrides.map((override) => mockFilteredSiteTrialPatient(override));
  } else {
    return Array.from({ length: faker.datatype.number(3) }, () =>
      mockFilteredSiteTrialPatient()
    );
  }
};

const mockFilteredSitePatient = (
  overrides?: RecursivePartial<FilteredSitePatient>
): FilteredSitePatient => {
  return {
    id: faker.datatype.uuid(),
    createdAt: faker.date.recent(),
    ...overrides,
    patient: {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      gender: faker.helpers.objectValue(Gender),
      dob: faker.date.birthdate(),
      ...overrides?.patient,
    },
    siteTrialPatients: mockFilteredSiteTrialPatients(
      overrides?.siteTrialPatients
    ),
  };
};

const mockFilteredSitePatients = (
  overrides?: RecursivePartial<FilteredSitePatient[]>
) => {
  if (overrides) {
    return overrides.map((override) => mockFilteredSitePatient(override));
  } else {
    return Array.from({ length: faker.datatype.number(50) }, () =>
      mockFilteredSitePatient()
    );
  }
};

export const mockFilteredSitePatientsResponse = (
  overrides?: RecursivePartial<FilteredSitePatientPageResponse>
): FilteredSitePatientPageResponse => {
  return {
    limit: 0,
    offset: 50,
    totalResults: 30,
    ...overrides,
    sitePatients: mockFilteredSitePatients(overrides?.sitePatients),
  };
};
