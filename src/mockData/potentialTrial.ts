import { faker } from "@faker-js/faker";
import { PotentialTrial, PotentialTrialStatus } from "types/PotentialTrial";

export const mockPotentialTrial = (): PotentialTrial => ({
  "trial-name": `${faker.lorem.word()}-${faker.datatype.number({
    min: 100,
    max: 999,
  })}`,
  "therapeutic-area": faker.lorem.words(),
  "trial-id": faker.datatype.uuid(),
  "date-added": faker.datatype.datetime(),
  deadline: faker.datatype.datetime(),
  sponsor: faker.lorem.word(),
  status: PotentialTrialStatus.PotentialApproved,
});

export const mockPotentialTrials = (numberOfSites = 10) => {
  const potentialTrials = Array.from(
    { length: faker.datatype.number({ min: 1, max: numberOfSites }) },
    () => mockPotentialTrial()
  );

  return potentialTrials;
};
