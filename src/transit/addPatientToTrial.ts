import * as transit from "transit-js";
import { AddPatientToTrialResponse } from "types/responseTypes/AddPatientToTrialResponse";
import { transitWriter } from "utils/transitUtils";
import { siteTrialPatientTransitMap } from "./patientAggregates";

export const addPatientToTrialResponseTransit = (
  response: AddPatientToTrialResponse
) => {
  const responseTransit = transit.map([
    transit.keyword("site-trial-patients"),
    response["site-trial-patients"].map(siteTrialPatientTransitMap),
    transit.keyword("site-trial-ids"),
    response["site-trial-ids"].map((id) => transit.uuid(id)),
    transit.keyword("site-trial-patient-changes"),
    transit.map([
      transit.keyword("created"),
      response["site-trial-patient-changes"].created,
      transit.keyword("updated"),
      response["site-trial-patient-changes"].updated,
      transit.keyword("no-op"),
      response["site-trial-patient-changes"]["no-op"],
    ]),
  ]);

  return responseTransit;
};

export const generateAddPatientToTrialResponseTransit = (
  response: AddPatientToTrialResponse
): string => {
  const transit = addPatientToTrialResponseTransit(response);
  return transitWriter.write(transit);
};
