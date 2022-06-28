import * as transit from "transit-js";
import { TherapeuticArea } from "types/TherapeuticAreas";
import { transitWriter } from "utils/transitUtils";

const therapeuticAreaMap = (therapeuticArea: TherapeuticArea) => {
  const therapeuticAreaTransit = transit.map([
    transit.keyword("id"),
    transit.uuid(therapeuticArea.id),
    transit.keyword("label"),
    therapeuticArea.label,
  ]);

  return therapeuticAreaTransit;
};

export const generateTherapeuticAreaTransit = (
  therapeuticAreas: TherapeuticArea[]
): string => {
  const transitTherapeuticAreas = therapeuticAreas.map(therapeuticAreaMap);
  const transitJson = transitWriter.write(transitTherapeuticAreas);

  return transitJson;
};
