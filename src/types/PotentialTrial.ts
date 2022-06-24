export enum PotentialTrialStatus {
  NONE = "none",
  POTENTIAL_APPROVED = "potential-approved",
  ON_HOLD = "on-hold",
  POTENTIAL_INTERESTED = "potential-interested",
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
