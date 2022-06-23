import { mockPotentialTrials } from "mockData/potentialTrial";
import { mockSites } from "mockData/site";
import { rest } from "msw";
import { generatePotentialTrialsTransit } from "transit/potentialTrials";
import { generateSitesTransit } from "transit/sites";
import { ApiMockOverrideType } from "types/MockApiTypes";
import { PotentialTrial } from "types/PotentialTrial";
import { Site } from "types/Site";

const siteHandlers = {
  siteVisitsOverview: () =>
    rest.get(`/api/salk/site/:siteId/visit/overview`, (_req, res, ctx) => {
      return res(ctx.json({ visitCount: 0 }));
    }),
  siteUser: () =>
    rest.get(`/api/salk/site/:siteId/user`, (_req, res, ctx) => {
      return res(ctx.json([]));
    }),
  potentialTrials: (overrides?: ApiMockOverrideType<PotentialTrial[]>) => {
    const status = overrides?.status ?? 200;

    const potentialTrials = overrides?.response ?? mockPotentialTrials(1);
    const transitPotentialTrials =
      generatePotentialTrialsTransit(potentialTrials);

    return rest.get(
      `/api/salk/site/:siteId/potential-trials`,
      (_req, res, ctx) => {
        return res(
          ctx.status(status),
          ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
          ctx.body(transitPotentialTrials)
        );
      }
    );
  },
  site: (overrides?: ApiMockOverrideType<Site[]>) => {
    const status = overrides?.status ?? 200;

    const sites = overrides?.response ?? mockSites(1);
    const transitSites = generateSitesTransit(sites);

    return rest.get(`/api/salk/sites`, (_req, res, ctx) => {
      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
        ctx.body(transitSites)
      );
    });
  },
};

export default siteHandlers;
