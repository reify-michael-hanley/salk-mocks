export type Site = {
  "enable-patient-matching": boolean;
  "state-province": string;
  name: string;
  "trial-creation-disabled": boolean;
  "site-trials": {
    name: string;
    "site-number": number | null;
    investigator: null | { name: string };
  }[];
  "postal-code": null | string;
  "reify-managed": boolean;
  "row-id": number;
  "is-pseudo": boolean;
  "created-at": string;
  "time-zone": string | null;
  "principal-id": string;
  country: string;
  id: string;
};
