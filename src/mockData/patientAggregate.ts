import { faker } from "@faker-js/faker";
import { PatientAggregate } from "types/PatientAggregate";
import { RecursivePartial } from "utils/typeUtils";
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
      "created-at": faker.date.past(),
      "owner-id": faker.datatype.uuid(),
      ...overrides?.["site-patient"],
    },
    patient: {
      "updated-at": faker.date.past(),
      address: faker.address.streetAddress(true),
      email: faker.internet.email(),
      "preferred-pronouns-notes": faker.lorem.sentence(),
      "preferred-pronouns": faker.lorem.word(),
      name: faker.name.findName(),
      "accessibility-reqs-notes": faker.lorem.sentence(),
      nickname: faker.name.firstName(),
      "employment-status": faker.lorem.word(),
      id: patientId,
      "owner-id": faker.datatype.uuid(),
      gender: faker.lorem.word(),
      hobbies: faker.lorem.word(),
      "created-at": faker.date.past(),
      "restrict-processing": false,
      ...overrides?.patient,
    },
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
