import { Site } from "types/site";
import { faker } from "@faker-js/faker";

const generateSiteTrials = () => {
  const siteTrials = Array.from(
    {
      length: faker.datatype.number({ min: 1, max: 15 }),
    },
    () => ({
      name: faker.lorem.slug(),
      "site-number": faker.datatype.number({ min: 100, max: 200 }),
      investigator: { name: faker.name.findName() },
    })
  );

  return siteTrials;
};

export const mockSite = (): Site => ({
  "enable-patient-matching": true,
  "state-province": `US-${faker.address.stateAbbr()}`,
  name: faker.company.companyName(),
  "trial-creation-disabled": false,
  "site-trials": generateSiteTrials(),
  "postal-code": faker.address.zipCodeByState("??"),
  "reify-managed": true,
  "row-id": faker.datatype.number(100),
  "is-pseudo": false,
  "created-at": faker.date.past().toDateString(),
  "time-zone": faker.address.timeZone(),
  "principal-id": `test|${faker.random.numeric(24)}`,
  country: "US",
  id: faker.datatype.uuid(),
});

export const mockSites = (numberOfSites = 10) => {
  const mockSites = Array.from(
    { length: faker.datatype.number({ min: 1, max: numberOfSites }) },
    () => mockSite()
  );

  return mockSites;
};
