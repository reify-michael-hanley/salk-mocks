import { therapeuticAreas } from "mockData/therapeuticArea";
import { rest } from "msw";
import { generateTherapeuticAreaTransit } from "transit/therapeuticArea";
import { ApiMockOverrideType } from "types/MockApiTypes";
import { TherapeuticArea } from "types/TherapeuticAreas";

const salkHandlers = {
  therapeuticAreas: (overrides?: ApiMockOverrideType<TherapeuticArea[]>) => {
    const status = overrides?.status ?? 200;

    const therapeuticAreasResponse = overrides?.response ?? therapeuticAreas;
    const transitTherapeuticAreas = generateTherapeuticAreaTransit(
      therapeuticAreasResponse
    );

    return rest.get(`/api/salk/therapeutic-areas`, (_req, res, ctx) => {
      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
        ctx.body(transitTherapeuticAreas)
      );
    });
  },
  siteNetworks: (overrides?: ApiMockOverrideType<[]>) => {
    const status = overrides?.status ?? 200;
    const response = JSON.stringify([]);

    return rest.get(`/api/salk/site-networks`, (_req, res, ctx) => {
      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json"),
        ctx.body(response)
      );
    });
  },
};

export default salkHandlers;
