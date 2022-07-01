import { faker } from "@faker-js/faker";
import { characters, planets } from "legacyDemoData/starwars";
import { mockPatientAggregate } from "mockData/patientAggregate";
import { mockSite } from "mockData/site";
import { mockSiteTrial } from "mockData/siteTrial";
import { DefaultBodyType, PathParams, RestRequest, setupWorker } from "msw";
import {
  PatientAggregate,
  SiteTrialPatientStageType,
} from "types/PatientAggregate";
import { AddPatientToTrialRequest } from "types/requestTypes/AddPatientToTrialRequest";
import { AddPatientToTrialResponse } from "types/responseTypes/AddPatientToTrialResponse";
import {
  FilteredSitePatient,
  FilteredSitePatientPageResponse,
} from "types/responseTypes/FilteredSitePatientPageResponse";
import { SiteTrial } from "types/SiteTrial";
import { transitRead } from "utils/transitUtils";
import {
  SalkHandlers,
  SiteHandlers,
  SiteTrialHandlers,
  SiteTrialPatientHandlers,
  TaskHandlers,
  UserHandlers,
  bulkActionHandlers,
  siteHandlers,
  siteTrialHandlers,
} from "mockApis/handlers";
import { ApiOverrideResponse } from "types/MockApiTypes";
// import fallbackHandlers from "./handlers/fallback";

const site = mockSite();
const siteTrials = planets.map((planet) =>
  mockSiteTrial({ name: planet, "site-id": site.id })
);
const siteTrialIds = siteTrials.map((trial) => trial.id);
const patients = (() => {
  return Array.from(characters, (character) => {
    return mockPatientAggregate({
      "site-trial-patient": {
        "site-trial-id": faker.helpers.arrayElement(siteTrialIds),
      },
      "site-patient": {
        "site-id": site.id,
      },
      patient: {
        name: character,
      },
    });
  });
})();

const bulkPatientChanges: {
  [patientId: string]: { trialIds: string[]; stage: SiteTrialPatientStageType };
} = {};

const onGetPatientAggregates = (
  req: RestRequest<DefaultBodyType, PathParams<string>>
): ApiOverrideResponse<PatientAggregate[]> => {
  const siteTrialId = req.params.siteTrialId as string;

  const patientAggregate = patients.filter((patient) => {
    const sitePatientId = patient["site-patient"].id;

    if (
      bulkPatientChanges[sitePatientId] &&
      bulkPatientChanges[sitePatientId].trialIds.includes(siteTrialId)
    )
      return true;

    return siteTrialId === patient["site-trial-patient"]["site-trial-id"];
  });

  patientAggregate.forEach((patient) => {
    const sitePatientId = patient["site-patient"].id;
    if (bulkPatientChanges[sitePatientId]) {
      patient["site-trial-patient"].stage =
        bulkPatientChanges[sitePatientId].stage;
      patient["site-trial-patient"]["site-trial-id"] = siteTrialId;
    }
  });

  return { body: patientAggregate };
};

const onSiteTrialGet = (
  req: RestRequest<DefaultBodyType, PathParams<string>>
): ApiOverrideResponse<SiteTrial> => {
  const siteTrial = siteTrials.find(
    (siteTrial) => siteTrial.id === req.params.siteTrialId
  );

  return { body: siteTrial ?? mockSiteTrial() };
};

const onAddPatientToTrial = (
  req: RestRequest<DefaultBodyType, PathParams<string>>
): ApiOverrideResponse<AddPatientToTrialResponse> => {
  const request = transitRead<AddPatientToTrialRequest>(
    JSON.stringify(req.body)
  );

  request["site-patient-ids"].forEach(
    (patientId) =>
      (bulkPatientChanges[patientId] = {
        trialIds: request["site-trial-ids"],
        stage: request.stage,
      })
  );

  const filteredPatients = patients.filter((patient) =>
    request["site-patient-ids"].includes(patient["site-patient"].id)
  );

  const response: AddPatientToTrialResponse = {
    "site-trial-ids": request["site-trial-ids"],
    "site-trial-patients": filteredPatients.map(
      (patient) => patient["site-trial-patient"]
    ),
    "site-trial-patient-changes": {
      created: request["site-trial-ids"].length,
      updated: 0,
      "no-op": 0,
    },
  };

  return { body: response };
};

const onGetFilteredSitePatientPage =
  (): // _req: RestRequest<DefaultBodyType, PathParams<string>>
  ApiOverrideResponse<FilteredSitePatientPageResponse> => {
    const sitePatients: FilteredSitePatient[] = patients.map((patient) => ({
      id: patient["site-patient"].id,
      createdAt: patient["site-patient"]["created-at"],
      patient: {
        id: patient.id,
        name: patient.patient.name,
      },
      siteTrialPatients: [
        {
          id: patient["site-trial-patient"].id,
          stage: patient["site-trial-patient"].stage,
          patientSource: null,
          siteTrials: {
            id: patient["site-trial-patient"]["site-trial-id"],
            name:
              siteTrials.find(
                (trial) =>
                  trial.id === patient["site-trial-patient"]["site-trial-id"]
              )?.name || faker.lorem.word(),
          },
          labels: [],
        },
      ],
    }));

    return {
      body: {
        limit: 50,
        offset: 0,
        totalResults: sitePatients.length,
        sitePatients,
      },
    };
  };

const handlers = [
  SiteTrialHandlers.getSiteTrialsWithMatches(() => ({ body: siteTrials })),
  siteTrialHandlers.getPatientAggregates(onGetPatientAggregates),
  SiteTrialHandlers.getSiteTrial(onSiteTrialGet),
  bulkActionHandlers.postAddPatientToTrials(onAddPatientToTrial),
  siteHandlers.getSites(() => ({ body: [site] })),
  siteHandlers.getFilteredSitePatientPage(onGetFilteredSitePatientPage),

  // ...Object.values(bulkActionHandlers).map((handler) => handler()),
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
