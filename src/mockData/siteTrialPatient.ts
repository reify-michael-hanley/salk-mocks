import { faker } from "@faker-js/faker";
import { SiteTrialPatientStage } from "types/PatientAggregate";
import { SiteTrialPatient } from "types/SiteTrialPatient";
import { RecursivePartial } from "utils/typeUtils";

export const mockSiteTrialPatient = (
  overrides?: RecursivePartial<SiteTrialPatient>
): SiteTrialPatient => ({
  "updated-at": faker.date.past(),
  "acknowledged-at": faker.date.past(),
  "subject-id": faker.lorem.word(),
  stage: faker.helpers.objectValue(SiteTrialPatientStage),
  starred: faker.datatype.boolean(),
  "planned-screening-date": faker.date.past(),
  "site-patient-id": faker.datatype.uuid(),
  "date-consent-signed": faker.date.past(),
  "patient-source-id": null,
  "screen-fail-reason": null,
  acknowledged: faker.datatype.boolean(),
  id: faker.datatype.uuid(),
  "site-trial-id": faker.datatype.uuid(),
  "patient-number": faker.phone.number(),
  "owner-id": faker.datatype.uuid(),
  "date-enrolled": faker.date.past(),
  "patient-log-comments": faker.lorem.sentence(),
  "pre-screen-fail-reason": faker.lorem.sentence(),
  "referral-patient-id": null,
  "consent-form-version": null,
  "created-at": faker.date.past(),
  ...overrides,
});
