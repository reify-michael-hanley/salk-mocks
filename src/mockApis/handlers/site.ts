import {mockSite} from "mockData/mockSite";
import { rest } from "msw";
import * as transit from "transit-js";
import { Site } from "types/site";

const siteTransitMap = (siteData: Site) =>
  transit.map([
    transit.keyword("enable-patient-matching"),
    siteData["enable-patient-matching"],
    transit.keyword("state-province"),
    siteData["state-province"],
    transit.keyword("name"),
    siteData.name,
    transit.keyword("trial-creation-disabled"),
    siteData["trial-creation-disabled"],
    transit.keyword("site-trials"),
    transit.list([
      transit.map([
        transit.keyword("name"),
        siteData["site-trials"].name,
        transit.keyword("site-number"),
        siteData["site-trials"]["site-number"],
        transit.keyword("investigator"),
        siteData["site-trials"].investigator,
      ]),
    ]),
    transit.keyword("postal-code"),
    siteData["postal-code"],
    transit.keyword("reify-managed"),
    siteData["reify-managed"],
    transit.keyword("row-id"),
    siteData["row-id"],
    transit.keyword("postal-code"),
    siteData["postal-code"],
    transit.keyword("reify-managed"),
    siteData["reify-managed"],
    transit.keyword("row-id"),
    siteData["row-id"],
    transit.keyword("is-pseudo"),
    siteData["is-pseudo"],
    transit.keyword("created-at"),
    new Date(siteData["created-at"]),
    transit.keyword("country"),
    siteData.country,
    transit.keyword("id"),
    transit.uuid(siteData.id),
    transit.keyword("time-zone"),
    siteData["time-zone"],
    transit.keyword("principal-id"),
    siteData["principal-id"],
  ]);

const transitWriter = transit.writer("json");

const siteHandlers = {
  siteVisitsOverview: rest.get(
    `/api/salk/site/:siteId/visit/overview`,
    (_req, res, ctx) => {
      return res(ctx.json({ visitCount: 0 }));
    }
  ),
  siteUser: rest.get(`/api/salk/site/:siteId/user`, (_req, res, ctx) => {
    return res(ctx.json([]));
  }),
  site: rest.get(`/api/salk/sites`, (_req, res, ctx) => {
    const transitSite = siteTransitMap(mockSite);
    const transitJson = transitWriter.write([transitSite]);
    return res(
      ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
      ctx.body(transitJson)
    );
  }),
};

export default siteHandlers;
