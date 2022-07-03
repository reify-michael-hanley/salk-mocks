import { faker } from "@faker-js/faker";
import { SitePatient } from "types/SitePatient";
import { RecursivePartial } from "utils/typeUtils";

export const mockSitePatient = (overrides?: RecursivePartial<SitePatient>) => {
  return {
    "bulk-import-payload-id": faker.datatype.uuid(),
    "batch-id": faker.datatype.uuid(),
    mrn: faker.lorem.word(),
    id: faker.datatype.uuid(),
    "site-id": faker.datatype.uuid(),
    "patient-id": faker.datatype.uuid(),
    "created-at": faker.date.recent(),
    "owner-id": faker.datatype.uuid(),
    ...overrides,
  };
};
