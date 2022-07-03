import { faker } from "@faker-js/faker";
import { PatientAggregate } from "types/PatientAggregate";
import { RecursivePartial } from "utils/typeUtils";
import { mockPatient } from "./patient";
import { mockSiteTrialPatient } from "./siteTrialPatient";

export const mockPatientAggregate = (
  overrides?: RecursivePartial<PatientAggregate>
) => {
  const id = overrides?.id ?? faker.datatype.uuid();
  const sitePatientId =
    overrides?.["site-patient"]?.id ?? faker.datatype.uuid();
  const patientId = overrides?.patient?.id ?? faker.datatype.uuid();

  const patientAggregate: PatientAggregate = {
    id: id,
    "site-trial-patient": mockSiteTrialPatient({
      id,
      "site-patient-id": sitePatientId,
    }),
    "site-patient": {
      "bulk-import-payload-id": faker.datatype.uuid(),
      "batch-id": faker.datatype.uuid(),
      mrn: faker.lorem.word(),
      id: sitePatientId,
      "site-id": faker.datatype.uuid(),
      "patient-id": patientId,
      "created-at": faker.date.recent(),
      "owner-id": faker.datatype.uuid(),
      ...overrides?.["site-patient"],
    },
    patient: mockPatient(overrides?.patient),
  };

  return patientAggregate;
};

export const mockPatientAggregates = (numberOfPatients = 30) => {
  const mockPatientAggregateData = Array.from(
    { length: numberOfPatients },
    () => mockPatientAggregate()
  );

  return mockPatientAggregateData;
};
