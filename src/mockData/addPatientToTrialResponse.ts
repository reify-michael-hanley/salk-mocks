import { AddPatientToTrialRequest } from "types/requestTypes/AddPatientToTrialRequest";
import { AddPatientToTrialResponse } from "types/responseTypes/AddPatientToTrialResponse";
import { transitRead } from "utils/transitUtils";
import { mockSiteTrialPatient } from "./siteTrialPatient";

export const mockAddPatientToTrialResponse = (
  request: string
): AddPatientToTrialResponse => {
  const requestData = transitRead<AddPatientToTrialRequest>(request);

  return {
    "site-trial-patients": requestData["site-patient-ids"].map((id) =>
      mockSiteTrialPatient({ "site-patient-id": id })
    ),
    "site-trial-ids": requestData["site-trial-ids"],
    "site-trial-patient-changes": {
      created: requestData["site-trial-ids"].length,
      updated: 0,
      "no-op": 0,
    },
  };
};
