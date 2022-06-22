import { Site } from "types/site";

const mockSiteData: Site = {
  "enable-patient-matching": true,
  "state-province": "US-IL",
  name: "Michael Seeded Site ID 1",
  "trial-creation-disabled": false,
  "site-trials": {
    name: "Michael Seeded SiteTrial ID 1",
    "site-number": 1,
    investigator: null,
  },
  "postal-code": null,
  "reify-managed": true,
  "row-id": 1,
  "is-pseudo": false,
  "created-at": "2022-06-09T21:37:34.000Z",
  "time-zone": "UTC",
  "principal-id": "local|blahblahblah@reifyhealth.com",
  country: "US",
  id: "e66c67b5-55eb-4599-b2fb-4d7c76ba64e5",
};

export default mockSiteData;
