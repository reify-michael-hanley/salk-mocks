import { TherapeuticArea } from "types/TherapeuticAreas";
import * as transit from "transit-js";

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
  const transitWriter = transit.writer("json");
  const transitTherapeuticAreas = therapeuticAreas.map(therapeuticAreaMap);
  const transitJson = transitWriter.write(transitTherapeuticAreas);

  return transitJson;
};
