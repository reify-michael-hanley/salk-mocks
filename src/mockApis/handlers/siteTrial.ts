import { mockSiteTrials } from "mockData/siteTrial";
import { rest } from "msw";
import { generateSiteTrialsTransit } from "transit/sitesTrials";
import { ApiMockOverrideType } from "types/MockApiTypes";
import { SiteTrial } from "types/SiteTrial";

const siteTrialHandlers = {
  siteTrialsWithMatches: (overrides?: ApiMockOverrideType<SiteTrial[]>) => {
    const status = overrides?.status ?? 200;

    const siteTrials = overrides?.respone ?? mockSiteTrials(10);
    const transitSiteTrials = generateSiteTrialsTransit(siteTrials);

    return rest.get(
      `/api/salk/site/:siteId/site-trials/with-matches`,
      (req, res, ctx) => {
        if (req.headers.get("accept") === "application/json") {
          return res(ctx.json(siteTrials));
        } else {
          return res(
            ctx.status(status),
            ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
            ctx.body(transitSiteTrials)
          );
        }
      }
    );
  },
  siteTrialStatus: () =>
    rest.get(`/api/salk/site/:siteId/site-trials/status`, (_req, res, ctx) => {
      return res(ctx.json({ statuses: [] }));
    }),
};

export default siteTrialHandlers;
