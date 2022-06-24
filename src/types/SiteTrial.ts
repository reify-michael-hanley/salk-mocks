export enum SiteStatus {
  NONE = "None",
  CLOSED = "closed",
  PLANNED = "planned",
  SELECTED = "selected",
}

export type SiteTrial = {
  archived: boolean;
  "updated-at": Date;
  "site-log-indication-enabled": boolean;
  protocol: string | null;
  name: string;
  "enrollment-close": null | Date;
  "sponsor-trial-id": string;
  "site-log-indicated-at": Date;
  "enrollment-goal": number;
  "site-status": SiteStatus;
  "row-id": number;
  "referral-enabled": boolean;
  "updated-by": string;
  "sponsor-logo-url": string | null;
  "site-log-indicating-user-id": string;
  id: string;
  "is-pseudo": boolean;
  "new-patient-match-count": number;
  "enable-sponsor-qa": boolean;
  information: string;
  "owner-id": string;
  "site-id": string;
  "site-number": number;
  "created-at": Date;
  "ie-criteria-checklist-enabled": boolean;
  sponsor: string;
  "patient-counts-by-stage": {
    "potential-candidate": number;
    completed: number;
    enrolled: number;
    "pre-screen-failure": number;
    total: number;
    "screen-failure": number;
    "first-visit-scheduled": number;
    "in-screening": number;
    discontinued: number;
    "pre-screening": number;
  };
  "default-protocol-external-version-id": null;
  "site-trial-latest-activity": null;
  "last-patient-visit": null;
  "new-transfer-count": number;
  "new-referral-count": number;
  "protocol-id": null;
  "first-patient-visit": null;
  "subject-id-prompt-stages": [];
  "enable-patient-matching": boolean;
  "investigator-id": null;
};
