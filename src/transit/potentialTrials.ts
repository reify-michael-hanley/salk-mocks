import * as transit from "transit-js";
import { PotentialTrial } from "types/PotentialTrial";
import { transitWriter } from "utils/transitUtils";

const potentialTrialTransitMap = (potentialTrial: PotentialTrial) => {
  const potentialTrialTransit = transit.map([
    transit.keyword("trial-name"),
    potentialTrial["trial-name"],
    transit.keyword("therapeutic-area"),
    potentialTrial["therapeutic-area"],
    transit.keyword("trial-id"),
    potentialTrial["trial-id"],
    transit.keyword("date-added"),
    potentialTrial["date-added"],
    transit.keyword("deadline"),
    potentialTrial.deadline,
    transit.keyword("sponsor"),
    potentialTrial.sponsor,
    transit.keyword("status"),
    transit.keyword(potentialTrial.status),
  ]);

  return potentialTrialTransit;
};

export const generatePotentialTrialsTransit = (
  potentialTrials: PotentialTrial[]
): string => {
  const transitSite = potentialTrials.map(potentialTrialTransitMap);
  const transitJson = transitWriter.write(transitSite);

  return transitJson;
};
