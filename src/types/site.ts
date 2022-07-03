import { SiteTrial } from "./SiteTrial";

type SiteTrials = Pick<SiteTrial, "name" | "site-number">[];

export type Site = {
  "enable-patient-matching": boolean;
  "state-province": string;
  name: string;
  "trial-creation-disabled": boolean;
  "site-trials": SiteTrials;
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
