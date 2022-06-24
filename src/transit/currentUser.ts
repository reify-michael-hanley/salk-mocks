import * as transit from "transit-js";
import { CurrentUser } from "types/CurrentUser";
import { transitWriter } from "utils/transitUtils";

const currentUserTransitMap = (currentUser: CurrentUser) => {
  const currentUserTransit = transit.map([
    transit.keyword("id"),
    currentUser.id,
    transit.keyword("email"),
    currentUser.email,
    transit.keyword("inactive"),
    currentUser.inactive,
    transit.keyword("country"),
    currentUser.country,
    transit.keyword("nick-name"),
    currentUser["nick-name"],
    transit.keyword("consent-ids"),
    transit.set(currentUser["consent-ids"]),
    transit.keyword("last-name"),
    currentUser["last-name"],
    transit.keyword("last-logged-out"),
    currentUser["last-logged-out"],
    transit.keyword("analytics-profile"),
    transit.keyword(currentUser["analytics-profile"]),
    transit.keyword("idp-id"),
    currentUser["idp-id"],
    transit.keyword("last-seen"),
    currentUser["last-seen"],
    transit.keyword("is-pseudo"),
    currentUser["is-pseudo"],
    transit.keyword("email-verified"),
    currentUser["email-verified"],
    transit.keyword("full-name"),
    currentUser["full-name"],
    transit.keyword("launchdarkly-hash"),
    currentUser["launchdarkly-hash"],
    transit.keyword("is-persona-switching-enabled"),
    currentUser["is-persona-switching-enabled"],
    transit.keyword("created-at"),
    currentUser["created-at"],
  ]);

  return currentUserTransit;
};

export const generateCurrentUserTransit = (
  currentUser: CurrentUser
): string => {
  const transitSite = currentUserTransitMap(currentUser);
  const transitJson = transitWriter.write(transitSite);

  return transitJson;
};
