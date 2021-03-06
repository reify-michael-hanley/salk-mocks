import * as transit from "transit-js";
import { SiteTrial } from "types/SiteTrial";
import { transitWriter } from "utils/transitUtils";

export const siteTrialTransitMap = (siteTrialData: SiteTrial) => {
  const siteTrialTransit = transit.map([
    transit.keyword("archived"),
    siteTrialData.archived,
    transit.keyword("updated-at"),
    siteTrialData["updated-at"],
    transit.keyword("site-log-indication-enabled"),
    siteTrialData["site-log-indication-enabled"],
    transit.keyword("protocol"),
    siteTrialData.protocol,
    transit.keyword("name"),
    siteTrialData.name,
    transit.keyword("enrollment-close"),
    siteTrialData["enrollment-close"],
    transit.keyword("sponsor-trial-id"),
    siteTrialData["sponsor-trial-id"],
    transit.keyword("site-log-indicated-at"),
    siteTrialData["site-log-indicated-at"],
    transit.keyword("enrollment-goal"),
    siteTrialData["enrollment-goal"],
    transit.keyword("site-status"),
    transit.keyword(siteTrialData["site-status"]),
    transit.keyword("row-id"),
    siteTrialData["row-id"],
    transit.keyword("referral-enabled"),
    siteTrialData["referral-enabled"],
    transit.keyword("updated-by"),
    siteTrialData["updated-by"],
    transit.keyword("sponsor-logo-url"),
    siteTrialData["sponsor-logo-url"],
    transit.keyword("site-log-indicating-user-id"),
    siteTrialData["site-log-indicating-user-id"],
    transit.keyword("id"),
    transit.uuid(siteTrialData.id),
    transit.keyword("is-pseudo"),
    siteTrialData["is-pseudo"],
    transit.keyword("new-patient-match-count"),
    siteTrialData["new-patient-match-count"],
    transit.keyword("enable-sponsor-qa"),
    siteTrialData["enable-sponsor-qa"],
    transit.keyword("information"),
    siteTrialData.information,
    transit.keyword("owner-id"),
    siteTrialData["owner-id"],
    transit.keyword("site-id"),
    transit.uuid(siteTrialData["site-id"]),
    transit.keyword("site-number"),
    siteTrialData["site-number"],
    transit.keyword("created-at"),
    siteTrialData["created-at"],
    transit.keyword("ie-criteria-checklist-enabled"),
    siteTrialData["ie-criteria-checklist-enabled"],
    transit.keyword("sponsor"),
    siteTrialData.sponsor,
    transit.keyword("patient-counts-by-stage"),
    transit.map([
      transit.keyword("potential-candidate"),
      siteTrialData["patient-counts-by-stage"]["potential-candidate"],
      transit.keyword("completed"),
      siteTrialData["patient-counts-by-stage"].completed,
      transit.keyword("enrolled"),
      siteTrialData["patient-counts-by-stage"].enrolled,
      transit.keyword("pre-screen-failure"),
      siteTrialData["patient-counts-by-stage"]["pre-screen-failure"],
      transit.keyword("total"),
      siteTrialData["patient-counts-by-stage"].total,
      transit.keyword("screen-failure"),
      siteTrialData["patient-counts-by-stage"]["screen-failure"],
      transit.keyword("first-visit-scheduled"),
      siteTrialData["patient-counts-by-stage"]["first-visit-scheduled"],
      transit.keyword("in-screening"),
      siteTrialData["patient-counts-by-stage"]["in-screening"],
      transit.keyword("discontinued"),
      siteTrialData["patient-counts-by-stage"].discontinued,
      transit.keyword("pre-screening"),
      siteTrialData["patient-counts-by-stage"]["pre-screening"],
    ]),
    transit.keyword("default-protocol-external-version-id"),
    siteTrialData["default-protocol-external-version-id"],
    transit.keyword("site-trial-latest-activity"),
    siteTrialData["site-trial-latest-activity"],
    transit.keyword("last-patient-visit"),
    siteTrialData["last-patient-visit"],
    transit.keyword("new-transfer-count"),
    siteTrialData["new-transfer-count"],
    transit.keyword("new-referral-count"),
    siteTrialData["new-referral-count"],
    transit.keyword("protocol-id"),
    siteTrialData["protocol-id"],
    transit.keyword("first-patient-visit"),
    siteTrialData["first-patient-visit"],
    transit.keyword("subject-id-prompt-stages"),
    siteTrialData["subject-id-prompt-stages"],
    transit.keyword("enable-patient-matching"),
    siteTrialData["enable-patient-matching"],
    transit.keyword("investigator-id"),
    siteTrialData["investigator-id"],
  ]);

  return siteTrialTransit;
};

export const generateSitetrialTransit = (siteTrial: SiteTrial) => {
  const transitSiteTrial = siteTrialTransitMap(siteTrial);
  const transitJson = transitWriter.write(transitSiteTrial);

  return transitJson;
};

export const generateSiteTrialsTransit = (siteTrials: SiteTrial[]): string => {
  const transitSiteTrials = siteTrials.map(siteTrialTransitMap);
  const transitJson = transitWriter.write(transitSiteTrials);

  return transitJson;
};
