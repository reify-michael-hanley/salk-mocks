import { faker } from "@faker-js/faker";
import { Fusebox } from "types/Fusebox";

export const mockFusebox: Fusebox = {
  "salk/race-and-ethnicity": {
    id: faker.datatype.uuid(),
    namespace: "salk",
    name: "race-and-ethnicity",
    description: "Demo-mode feature flag",
    "created-at": faker.date.past(),
    "enabled?": null,
  },
  "study-team/enable-pii-fields": {
    id: faker.datatype.uuid(),
    namespace: "study-team",
    name: "enable-pii-fields",
    description: "Demo-mode feature flag",
    "created-at": faker.date.past(),
    "enabled?": true,
  },
};
