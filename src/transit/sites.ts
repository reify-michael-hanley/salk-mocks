import * as transit from "transit-js";
import { Site } from "types/Site";

const siteTransitMap = (siteData: Site) => {
  const transitSiteTrials = siteData["site-trials"].map((siteTrial) => {
    return transit.map([
      transit.keyword("name"),
      siteTrial.name,
      transit.keyword("site-number"),
      siteTrial["site-number"],
      transit.keyword("investigator"),
      transit.map([transit.keyword("name"), siteTrial.investigator?.name]),
    ]);
  });

  const siteTransit = transit.map([
    transit.keyword("enable-patient-matching"),
    siteData["enable-patient-matching"],
    transit.keyword("state-province"),
    siteData["state-province"],
    transit.keyword("name"),
    siteData.name,
    transit.keyword("trial-creation-disabled"),
    siteData["trial-creation-disabled"],
    transit.keyword("site-trials"),
    transit.list(transitSiteTrials),
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

  return siteTransit;
};

export const generateSitesTransit = (sites: Site[]): string => {
  const transitWriter = transit.writer("json");
  const transitSite = sites.map(siteTransitMap);
  const transitJson = transitWriter.write(transitSite);

  return transitJson;
};
