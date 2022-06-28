import { faker } from "@faker-js/faker";
import { PatientAggregate } from "types/PatientAggregate";
import { RecursivePartial } from "utils/typeUtils";

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

export const mockPatientAggregate = (
  overrides?: RecursivePartial<PatientAggregate>
) => {
  const id = overrides?.id ?? faker.datatype.uuid();
  const sitePatientId =
    overrides?.["site-patient"]?.id ?? faker.datatype.uuid();
  const patientId = overrides?.patient?.id ?? faker.datatype.uuid();

  const patientAggregate: PatientAggregate = {
    id: id,
    "site-trial-patient": {
      "stage-last-updated": faker.date.past(),
      "updated-at": faker.date.past(),
      "acknowledged-at": faker.date.past(),
      "subject-id": faker.lorem.word(),
      stage: faker.helpers.objectValue(SiteTrialPatientStage),
      starred: faker.datatype.boolean(),
      "last-contact-attempt-date": faker.date.past(),
      "planned-screening-date": faker.date.past(),
      "site-patient-id": sitePatientId,
      "date-consent-signed": faker.date.past(),
      "patient-source-id": null,
      "screen-fail-reason": faker.lorem.sentence(),
      acknowledged: faker.datatype.boolean(),
      id: id,
      "site-trial-id": faker.datatype.uuid(),
      "patient-number": faker.datatype.number(),
      "owner-id": faker.datatype.uuid(),
      "contact-attempt-count": faker.datatype.number(),
      "date-enrolled": faker.date.past(),
      "patient-log-comments": faker.lorem.sentence(),
      "pre-screen-fail-reason": faker.lorem.sentence(),
      "referral-patient-id": null,
      "consent-form-version": faker.lorem.word(),
      "created-at": faker.date.past(),
      ...overrides?.["site-trial-patient"],
    },
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
    {
      length: faker.datatype.number({
        min: numberOfPatients,
        max: numberOfPatients,
      }),
    },
    () => mockPatientAggregate()
  );

  return mockPatientAggregateData;
};
