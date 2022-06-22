import { rest } from "msw";

const siteTrialHandlers = {
  siteTrialsWithMatchesHanlder: rest.get(
    `/api/salk/site/:siteId/site-trials/with-matches`,
    (_req, res, ctx) => {
      return res(ctx.json([]));
    }
  ),
  siteTrialStatus: rest.get(
    `/api/salk/site/:siteId/site-trials/status`,
    (_req, res, ctx) => {
      return res(ctx.json({ statuses: [] }));
    }
  ),
};

export default siteTrialHandlers;
