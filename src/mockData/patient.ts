import { faker } from "@faker-js/faker";
import { Patient } from "types/Patient";
import { RecursivePartial } from "utils/typeUtils";

export const mockPatient = (overrides?: RecursivePartial<Patient>): Patient => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    nickname: faker.name.firstName(),
    "created-at": faker.date.recent(),
    "updated-at": faker.date.recent(),
    address: faker.address.streetAddress(true),
    email: faker.internet.email(),
    gender: faker.lorem.word(),
    "preferred-pronouns-notes": faker.lorem.sentence(),
    "preferred-pronouns": faker.lorem.word(),
    "accessibility-reqs-notes": faker.lorem.sentence(),
    "employment-status": faker.lorem.word(),
    "owner-id": faker.datatype.uuid(),
    hobbies: faker.lorem.word(),
    "restrict-processing": false,
    ...overrides,
  };
};
