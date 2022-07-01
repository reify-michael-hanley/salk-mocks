import { mockFilteredSitePatientsResponse } from "mockData/filteredSitePatientsResponse";
import { mockFusebox } from "mockData/fusbox";
import { mockPotentialTrials } from "mockData/potentialTrial";
import { mockSites } from "mockData/site";
import { rest } from "msw";
import { generateFilteredSitePatientPageTransit } from "transit/filteredSitePatientPage";
import { generateFuseboxTransit } from "transit/fusebox";
import { generatePotentialTrialsTransit } from "transit/potentialTrials";
import { generateSitesTransit } from "transit/sites";
import { Fusebox } from "types/Fusebox";
import { ApiMockOverrideCallback } from "types/MockApiTypes";
import { PotentialTrial } from "types/PotentialTrial";
import { FilteredSitePatientPageResponse } from "types/responseTypes/FilteredSitePatientPageResponse";
import { Site } from "types/Site";

const siteHandlers = {
  getSiteVisitsOverview: () =>
    rest.get(`/api/salk/site/:siteId/visit/overview`, (_req, res, ctx) => {
      return res(ctx.json({ visitCount: 0 }));
    }),
  getSiteUser: () =>
    rest.get(`/api/salk/site/:siteId/user`, (_req, res, ctx) => {
      return res(ctx.json([]));
    }),
  getPotentialTrials: (
    overrides?: ApiMockOverrideCallback<PotentialTrial[]>
  ) => {
    return rest.get(
      `/api/salk/site/:siteId/potential-trials`,
      (req, res, ctx) => {
        const { body = mockPotentialTrials(1), status = 200 } =
          overrides?.(req) || {};

        const transitResponse = generatePotentialTrialsTransit(body);

        return res(
          ctx.status(status),
          ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
          ctx.body(transitResponse)
        );
      }
    );
  },
  getFuseBox: (overrides?: ApiMockOverrideCallback<Fusebox>) => {
    return rest.get(`/api/salk/site/:siteId/fusebox`, (req, res, ctx) => {
      const { body = mockFusebox, status = 200 } = overrides?.(req) || {};

      const transitResponse = generateFuseboxTransit(body);

      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
        ctx.body(transitResponse)
      );
    });
  },
  getSites: (overrides?: ApiMockOverrideCallback<Site[]>) => {
    return rest.get(`/api/salk/sites`, (req, res, ctx) => {
      const { body = mockSites(1), status = 200 } = overrides?.(req) || {};

      const transitResponse = generateSitesTransit(body);

      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
        ctx.body(transitResponse)
      );
    });
  },
  getFilteredSitePatientPage: (
    overrides?: ApiMockOverrideCallback<FilteredSitePatientPageResponse>
  ) => {
    return rest.post(
      `/api/salk/site/:siteId/patient-index`,
      (req, res, ctx) => {
        const { body = mockFilteredSitePatientsResponse(), status = 200 } =
          overrides?.(req) || {};

        const transitResponse = generateFilteredSitePatientPageTransit(body);

        return res(
          ctx.status(status),
          ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
          ctx.body(transitResponse)
        );
      }
    );
  },
};

export default siteHandlers;
