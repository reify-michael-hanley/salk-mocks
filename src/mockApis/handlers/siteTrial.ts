import { mockPatientAggregates } from "mockData/patientAggregate";
import { mockSiteTrial, mockSiteTrials } from "mockData/siteTrial";
import { rest } from "msw";
import { generatePatientAggregateTransit } from "transit/patientAggregates";
import { generateSiteTrialsTransit } from "transit/sitesTrials";
import { ApiMockOverrideType } from "types/MockApiTypes";
import { PatientAggregate } from "types/PatientAggregate";
import { SiteTrial } from "types/SiteTrial";

const siteTrialHandlers = {
  /** GET `api/salk/site-trial/:siteTrialId` */
  getSiteTrial: (overrides?: ApiMockOverrideType<SiteTrial>) => {
    const status = overrides?.status ?? 200;

    const siteTrial = overrides?.response ?? mockSiteTrial();

    return rest.get(`api/salk/site-trial/:siteTrialId`, (req, res, ctx) => {
      siteTrial.id = req.params.siteTrialId as string;

      const transitSiteTrials = generateSiteTrialsTransit([siteTrial]);
      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json"),
        ctx.body(transitSiteTrials)
      );
    });
  },
  /** GET `/api/salk/site/:siteId/site-trials/with-matches` */
  getSiteTrialsWithMatches: (overrides?: ApiMockOverrideType<SiteTrial[]>) => {
    const status = overrides?.status ?? 200;

    const siteTrials = overrides?.response ?? mockSiteTrials(10);
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
    overrides?: ApiMockOverrideType<PatientAggregate[]>
  ) => {
    const status = overrides?.status ?? 200;

    const patientAggregates = overrides?.response ?? mockPatientAggregates();
    const transitPatientAggregates =
      generatePatientAggregateTransit(patientAggregates);

    return rest.get(
      `/api/salk/site-trial/:siteTrialId/patient-aggregates`,
      (_req, res, ctx) => {
        return res(
          ctx.status(status),
          ctx.set("Content-Type", "application/transit+json"),
          ctx.body(transitPatientAggregates)
        );
      }
    );
  },
};

export default siteTrialHandlers;
