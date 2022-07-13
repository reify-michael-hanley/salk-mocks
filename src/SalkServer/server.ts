import {
  bulkActionHandlers,
  SalkHandlers,
  SiteHandlers,
  SiteTrialHandlers,
  SiteTrialPatientHandlers,
  TaskHandlers,
  UserHandlers,
} from "mockApis/handlers";
import { mockSiteTrial } from "mockData/siteTrial";
import { DefaultBodyType, PathParams, RestRequest, setupWorker } from "msw";
import { ApiOverrideResponse } from "types/MockApiTypes";
import { PatientAggregate } from "types/PatientAggregate";
import { AddPatientToTrialRequest } from "types/requestTypes/AddPatientToTrialRequest";
import { AddPatientToTrialResponse } from "types/responseTypes/AddPatientToTrialResponse";
import {
  FilteredSitePatient,
  FilteredSitePatientPageResponse,
} from "types/responseTypes/FilteredSitePatientPageResponse";
import { SiteTrial } from "types/SiteTrial";
import { SiteTrialPatient } from "types/SiteTrialPatient";
import { transitRead } from "utils/transitUtils";
import { patients, SiteOrchestrator } from "./orchestrators/SiteOrchestrator";
// import fallbackHandlers from "./handlers/fallback";
import * as transit from "transit-js";

const siteOrchestrator = SiteOrchestrator();
const site = siteOrchestrator.getSite();

const onGetPatientAggregates = (
  req: RestRequest<DefaultBodyType, PathParams<string>>
): ApiOverrideResponse<PatientAggregate[]> => {
  const siteTrialId = req.params.siteTrialId as string;

  const patientAggregates = siteOrchestrator.getPatientAggregates(siteTrialId);

  return { body: patientAggregates };
};

const onSiteTrialGet = (
  req: RestRequest<DefaultBodyType, PathParams<string>>
): ApiOverrideResponse<SiteTrial> => {
  const siteTrial = siteOrchestrator.trials.get(
    req.params.siteTrialId as string
  );
  return { body: siteTrial ?? mockSiteTrial() };
};

const onAddPatientToTrial = (
  req: RestRequest<DefaultBodyType, PathParams<string>>
): ApiOverrideResponse<AddPatientToTrialResponse> => {
  const request = transitRead<AddPatientToTrialRequest>(
    JSON.stringify(req.body)
  );

  const addedPatients: SiteTrialPatient[] = [];
  request["site-patient-ids"].forEach((patientId) => {
    request["site-trial-ids"].forEach((trialId) => {
      const newSiteTrialPatient = siteOrchestrator.trials.addPatientToTrial(
        trialId,
        patientId,
        request.stage
      );
      addedPatients.push(newSiteTrialPatient);
    });
  });

  const response: AddPatientToTrialResponse = {
    "site-trial-ids": request["site-trial-ids"],
    "site-trial-patients": addedPatients,
    "site-trial-patient-changes": {
      created: request["site-trial-ids"].length,
      updated: 0,
      "no-op": 0,
    },
  };

  return { body: response };
};

const onGetFilteredSitePatientPage = (
  req: RestRequest<DefaultBodyType, PathParams<string>>
): ApiOverrideResponse<FilteredSitePatientPageResponse> => {
  const reader = transit.reader("json");
  const request = reader.read(JSON.stringify(req.body));
  console.log("request.get(): ", request.entries());
  console.log("request.get(): ", request.get(transit.keyword("sort")));

  const page = request.get(transit.keyword("page"));
  const limit = page.get(transit.keyword("limit"));
  const offset = page.get(transit.keyword("offset"));
  // const sortOrder = request.get("sort");
  // const sortOrder = request.entries().get("");
  // const sortedBy = request.entries().entries[0][1]._name;

  const sitePatients = siteOrchestrator.sitePatients.get();
  const filteredSitePatients: FilteredSitePatient[] = sitePatients.map(
    (patient) => {
      const patientInfo = patients.find(
        ({ id }) => id === patient["patient-id"]
      );

      if (!patientInfo) throw new Error("Patient info missing");

      const patientTrials = siteOrchestrator.trials.getPatientTrials(
        patient["patient-id"]
      );

      const siteTrialPatients =
        siteOrchestrator.trials.getSiteTrialPatientsById(patient["patient-id"]);

      return {
        id: patient.id,
        createdAt: patient["created-at"],
        patient: {
          id: patientInfo.id,
          name: patientInfo.name,
          gender: patientInfo.gender,
          email: patientInfo.email,
        },
        siteTrialPatients: siteTrialPatients.map((trialPatient) => {
          const trial = patientTrials.find(
            (trial) => trial.id === trialPatient["site-trial-id"]
          );
          return {
            id: trialPatient.id,
            stage: trialPatient.stage,
            labels: [],
            starred: trialPatient.starred,
            subjectId: trialPatient["subject-id"],
            patientSource: null,
            siteTrials: {
              id: trialPatient["site-trial-id"],
              name: trial?.name,
            },
          };
        }),
      };
    }
  );

  return {
    body: {
      limit,
      offset,
      totalResults: filteredSitePatients.length,
      sitePatients: filteredSitePatients.slice(offset, offset + limit),
    },
  };
};

const handlers = [
  SiteTrialHandlers.getSiteTrialsWithMatches(() => ({
    body: siteOrchestrator.trials.get(),
  })),
  SiteTrialHandlers.getPatientAggregates(onGetPatientAggregates),
  SiteTrialHandlers.getSiteTrial(onSiteTrialGet),
  bulkActionHandlers.postAddPatientToTrials(onAddPatientToTrial),
  SiteHandlers.getSites(() => ({ body: [site] })),
  SiteHandlers.getFilteredSitePatientPage(onGetFilteredSitePatientPage),

  ...Object.values(SiteHandlers).map((handler) => handler()),
  ...Object.values(SiteTrialHandlers).map((handler) => handler()),
  ...Object.values(SiteTrialPatientHandlers).map((handler) => handler()),
  ...Object.values(TaskHandlers).map((handler) => handler()),
  ...Object.values(SalkHandlers).map((handler) => handler()),
  ...Object.values(UserHandlers).map((handler) => handler()),
  // ...Object.values(fallbackHandlers),
];

export const mockWorker = setupWorker(...handlers);
// export const mockServer = setupServer(...handlers);
