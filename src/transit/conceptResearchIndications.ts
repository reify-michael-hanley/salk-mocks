import * as transit from "transit-js";
import { ConceptResearchIndication } from "types/ConceptResearchIndication";
import { transitWriter } from "utils/transitUtils";

const conceptResearchIndicationsTransitMap = (
  conceptResearchIndication: ConceptResearchIndication
) => {
  const conceptResearchIndicationTransit = transit.map([
    transit.keyword("id"),
    transit.uuid(conceptResearchIndication.id),
    transit.keyword("label"),
    conceptResearchIndication.label,
    transit.keyword("therapeutic-area"),
    conceptResearchIndication["therapeutic-area"],
  ]);

  return conceptResearchIndicationTransit;
};

export const generateConceptResearchIndicationTransit = (
  conceptResearchIndications: ConceptResearchIndication[]
): string => {
  const transitConceptResearchIndications = conceptResearchIndications.map(
    conceptResearchIndicationsTransitMap
  );
  const transitJson = transitWriter.write(transitConceptResearchIndications);

  return transitJson;
};
