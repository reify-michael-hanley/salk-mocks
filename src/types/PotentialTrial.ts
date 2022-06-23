export enum PotentialTrialStatus {
  PotentialApproved = "potential-approved",
  OnHold = "on-hold",
  PotentialInterested = "potential-interested",
}

export type PotentialTrial = {
  "trial-id": string;
  "trial-name": string;
  "therapeutic-area": string;
  "date-added": Date;
  deadline: Date;
  sponsor: string;
  status: PotentialTrialStatus;
};
