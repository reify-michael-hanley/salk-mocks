import { mockConceptResearchIndication } from "mockData/conceptResearchIndications";
import { mockTherapeuticAreas } from "mockData/therapeuticArea";
import { rest } from "msw";
import { generateConceptResearchIndicationTransit } from "transit/conceptResearchIndications";
import { generateTherapeuticAreaTransit } from "transit/therapeuticAreas";
import { ConceptResearchIndication } from "types/ConceptResearchIndication";
import { ApiMockOverrideCallback } from "types/MockApiTypes";
import { TherapeuticArea } from "types/TherapeuticAreas";

const salkHandlers = {
  /** `/api/salk/therapeutic-areas` */
  getTherapeuticAreas: (
    overrides?: ApiMockOverrideCallback<TherapeuticArea[]>
  ) => {
    return rest.get(`/api/salk/therapeutic-areas`, (req, res, ctx) => {
      const { body = mockTherapeuticAreas, status = 200 } =
        overrides?.(req) || {};

      const transitResponse = generateTherapeuticAreaTransit(body);

      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
        ctx.body(transitResponse)
      );
    });
  },
  /** `/api/salk/research-indications` */
  getConceptResearchIndications: (
    overrides?: ApiMockOverrideCallback<ConceptResearchIndication[]>
  ) => {
    return rest.get(`/api/salk/research-indications`, (req, res, ctx) => {
      const { body = mockConceptResearchIndication, status = 200 } =
        overrides?.(req) || {};

      const responseTransit = generateConceptResearchIndicationTransit(body);

      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json"),
        ctx.body(responseTransit)
      );
    });
  },
  /** `/api/salk/site-networks` */
  getSiteNetworks: (overrides?: ApiMockOverrideCallback<[]>) => {
    return rest.get(`/api/salk/site-networks`, (req, res, ctx) => {
      const { body = [], status = 200 } = overrides?.(req) || {};

      const transitBody = JSON.stringify(body);

      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json"),
        ctx.body(transitBody)
      );
    });
  },
};

export default salkHandlers;
