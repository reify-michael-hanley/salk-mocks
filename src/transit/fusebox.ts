import * as transit from "transit-js";
import { Fusebox, FuseboxObject } from "types/Fusebox";
import { transitWriter } from "utils/transitUtils";

const fuseboxObjectTransitMap = (fuseboxObject: FuseboxObject) =>
  transit.map([
    transit.keyword("id"),
    transit.uuid(fuseboxObject.id),
    transit.keyword("namespace"),
    fuseboxObject.namespace,
    transit.keyword("name"),
    fuseboxObject.name,
    transit.keyword("description"),
    fuseboxObject.description,
    transit.keyword("created-at"),
    fuseboxObject["created-at"],
    transit.keyword("enabled?"),
    fuseboxObject["enabled?"],
  ]);

const fuseboxTransitMap = (fusebox: Fusebox) => {
  const fuseboxTransit = transit.map([
    transit.keyword("salk/race-and-ethnicity"),
    fuseboxObjectTransitMap(fusebox["salk/race-and-ethnicity"]),
    transit.keyword("study-team/enable-pii-fields"),
    fuseboxObjectTransitMap(fusebox["study-team/enable-pii-fields"]),
  ]);

  return fuseboxTransit;
};

export const generateFuseboxTransit = (fusebox: Fusebox): string => {
  const transitFusebox = fuseboxTransitMap(fusebox);
  const transitJson = transitWriter.write(transitFusebox);

  return transitJson;
};
