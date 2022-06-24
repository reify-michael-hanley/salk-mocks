import { faker } from "@faker-js/faker";
import { SiteStatus, SiteTrial } from "types/SiteTrial";
import { principleId } from "utils/matchingDataUtils";

export const mockSiteTrial = (): SiteTrial => ({
  archived: faker.datatype.boolean(),
  "updated-at": faker.datatype.datetime(),
  "site-log-indication-enabled": faker.datatype.boolean(),
  protocol: faker.lorem.word(),
  name: `${faker.lorem.word()}-${faker.datatype.number({
    min: 100,
    max: 999,
  })}`,
  "enrollment-close": faker.datatype.datetime(),
  "sponsor-trial-id": faker.datatype.uuid(),
  "site-log-indicated-at": faker.datatype.datetime(),
  "enrollment-goal": faker.datatype.number({ min: 30, max: 999 }),
  "site-status": faker.helpers.objectValue(SiteStatus),
  "row-id": faker.datatype.number({ min: 100, max: 999 }),
  "referral-enabled": faker.datatype.boolean(),
  "updated-by": faker.datatype.uuid(),
  "sponsor-logo-url": null,
  "site-log-indicating-user-id": principleId,
  id: faker.datatype.uuid(),
  "is-pseudo": faker.datatype.boolean(),
  "new-patient-match-count": faker.datatype.number({ min: 1, max: 999 }),
  "enable-sponsor-qa": faker.datatype.boolean(),
  information: faker.lorem.sentences(),
  "owner-id": faker.datatype.uuid(),
  "site-id": faker.datatype.uuid(),
  "site-number": faker.datatype.number({ min: 100, max: 999 }),
  "created-at": faker.datatype.datetime(),
  "ie-criteria-checklist-enabled": faker.datatype.boolean(),
  sponsor: faker.lorem.word(),
  "patient-counts-by-stage": {
    "potential-candidate": faker.datatype.number({ min: 1, max: 100 }),
    completed: faker.datatype.number({ min: 1, max: 100 }),
    enrolled: faker.datatype.number({ min: 1, max: 100 }),
    "pre-screen-failure": faker.datatype.number({ min: 1, max: 100 }),
    total: faker.datatype.number({ min: 1, max: 100 }),
    "screen-failure": faker.datatype.number({ min: 1, max: 100 }),
    "first-visit-scheduled": faker.datatype.number({ min: 1, max: 100 }),
    "in-screening": faker.datatype.number({ min: 1, max: 100 }),
    discontinued: faker.datatype.number({ min: 1, max: 100 }),
    "pre-screening": faker.datatype.number({ min: 1, max: 100 }),
  },
  "default-protocol-external-version-id": null,
  "site-trial-latest-activity": null,
  "last-patient-visit": null,
  "new-transfer-count": faker.datatype.number({ min: 1, max: 100 }),
  "new-referral-count": faker.datatype.number({ min: 1, max: 100 }),
  "protocol-id": null,
  "first-patient-visit": null,
  "subject-id-prompt-stages": [],
  "enable-patient-matching": faker.datatype.boolean(),
  "investigator-id": null,
});

export const mockSiteTrials = (numberOfSites = 10) => {
  const mockSiteTrials = Array.from(
    { length: faker.datatype.number({ min: 1, max: numberOfSites }) },
    () => mockSiteTrial()
  );

  return mockSiteTrials;
};
