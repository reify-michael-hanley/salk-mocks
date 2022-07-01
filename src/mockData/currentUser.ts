import { faker } from "@faker-js/faker";
import { AnalyticProfile, CurrentUser } from "types/CurrentUser";
import { principleId } from "utils/matchingDataUtils";

export const mockCurrentUser: CurrentUser = {
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  inactive: false,
  country: faker.address.countryCode(),
  "nick-name": faker.name.firstName(),
  "consent-ids": Array.from(Array(10)).map(() => faker.datatype.uuid()),
  "last-name": faker.name.lastName(),
  "last-logged-out": faker.date.recent(),
  "analytics-profile": faker.helpers.objectValue(AnalyticProfile),
  "idp-id": principleId,
  "last-seen": faker.date.recent(),
  "is-pseudo": false,
  "email-verified": faker.datatype.boolean(),
  "full-name": faker.name.findName(),
  "launchdarkly-hash": faker.lorem.word(),
  "is-persona-switching-enabled": false,
  "created-at": faker.date.recent(),
};
