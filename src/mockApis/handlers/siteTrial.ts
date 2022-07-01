import { mockPatientAggregates } from "mockData/patientAggregate";
import { mockSiteTrial, mockSiteTrials } from "mockData/siteTrial";
import { rest } from "msw";
import { generatePatientAggregateTransit } from "transit/patientAggregates";
import {
  generateSiteTrialsTransit,
  generateSitetrialTransit,
} from "transit/sitesTrials";
import { ApiMockOverrideCallback } from "types/MockApiTypes";
import { PatientAggregate } from "types/PatientAggregate";
import { SiteTrial } from "types/SiteTrial";

const siteTrialHandlers = {
  /** GET `api/salk/site-trial/:siteTrialId` */
  getSiteTrial: (overrides?: ApiMockOverrideCallback<SiteTrial>) => {
    return rest.get(`api/salk/site-trial/:siteTrialId`, (req, res, ctx) => {
      const { body = mockSiteTrial(), status = 200 } = overrides?.(req) || {};
      body.id = req.params.siteTrialId as string;

      const transitResponse = generateSitetrialTransit(body);

      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json"),
        ctx.body(transitResponse)
      );
    });
  },
  /** GET `/api/salk/site/:siteId/site-trials/with-matches` */
  getSiteTrialsWithMatches: (
    overrides?: ApiMockOverrideCallback<SiteTrial[]>
  ) => {
    return rest.get(
      `/api/salk/site/:siteId/site-trials/with-matches`,
      (req, res, ctx) => {
        const { body = mockSiteTrials(10), status = 200 } =
          overrides?.(req) || {};

        if (req.headers.get("accept") === "application/json") {
          return res(ctx.status(status), ctx.json(body));
        } else {
          const transitResponse = generateSiteTrialsTransit(body);

          return res(
            ctx.status(status),
            ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
            ctx.body(transitResponse)
          );
        }
      }
    );
  },
  /** GET `/api/salk/site/:siteId/site-trials/status` */
  getSiteTrialStatus: () => {
    return rest.get(
      `/api/salk/site/:siteId/site-trials/status`,
      (_req, res, ctx) => {
        return res(ctx.json({ statuses: [] }));
      }
    );
  },
  /** GET `/api/salk/site-trial/:siteTrialId/patient-aggregates` */
  getPatientAggregates: (
    overrides?: ApiMockOverrideCallback<PatientAggregate[]>
  ) => {
    return rest.get(
      `/api/salk/site-trial/:siteTrialId/patient-aggregates`,
      (req, res, ctx) => {
        const { body = mockPatientAggregates(), status = 200 } =
          overrides?.(req) || {};

        const transitResponse = generatePatientAggregateTransit(body);

        return res(
          ctx.status(status),
          ctx.set("Content-Type", "application/transit+json"),
          ctx.body(transitResponse)
        );
      }
    );
  },
};

export default siteTrialHandlers;
