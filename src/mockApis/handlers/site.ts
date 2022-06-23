import { mockSites } from "mockData/site";
import { rest } from "msw";
import { generateSitesTransit } from "transit/sites";
import { ApiMockOverrideType } from "types/MockApiTypes";
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
  site: (overrides?: ApiMockOverrideType<Site[]>) => {
    const status = overrides?.status ?? 200;

    const sites = overrides?.respone ?? mockSites(1);
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
