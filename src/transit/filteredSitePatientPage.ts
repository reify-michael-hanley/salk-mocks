import * as transit from "transit-js";
import {
  FilteredSitePatient,
  FilteredSitePatientPageResponse,
  FilteredSiteTrialPatientLabel,
} from "types/responseTypes/FilteredSitePatientPageResponse";
import { transitWriter } from "utils/transitUtils";

const labelsMap = (label: FilteredSiteTrialPatientLabel) => {
  return transit.map([
    ...(label.id ? [transit.keyword("id"), transit.uuid(label.id)] : []),
    ...(label.title
      ? [transit.keyword("title"), transit.uuid(label.title)]
      : []),
    ...(label.color
      ? [transit.keyword("color"), transit.uuid(label.color)]
      : []),
  ]);
};

const filteredSitePatientTransit = (
  filteredSitePatient: FilteredSitePatient
) => {
  const transitFilteredSitePatient = transit.map([
    transit.keyword("id"),
    transit.uuid(filteredSitePatient.id),
    transit.keyword("createdAt"),
    filteredSitePatient.createdAt,
    transit.keyword("patient"),
    transit.map([
      transit.keyword("id"),
      transit.uuid(filteredSitePatient.patient.id),
      transit.keyword("name"),
      filteredSitePatient.patient.name,
    ]),
    transit.keyword("siteTrialPatients"),
    filteredSitePatient.siteTrialPatients.map((siteTrialPatient) =>
      transit.map([
        transit.keyword("id"),
        transit.uuid(siteTrialPatient.id),
        transit.keyword("stage"),
        transit.keyword(siteTrialPatient.stage),
        transit.keyword("patientSource"),
        siteTrialPatient.patientSource,
        ...(siteTrialPatient.siteTrial
          ? [
              transit.keyword("siteTrial"),
              transit.map([
                transit.keyword("id"),
                transit.uuid(siteTrialPatient.siteTrial.id),
                transit.keyword("name"),
                siteTrialPatient.siteTrial?.name,
              ]),
            ]
          : []),
        transit.keyword("labels"),
        siteTrialPatient.labels.map(labelsMap),
      ])
    ),
  ]);

  return transitFilteredSitePatient;
};

const FilteredSitePatientPageMap = (
  filteredSitePatientPage: FilteredSitePatientPageResponse
) => {
  const filteredSitePatientPageTransit = transit.map([
    transit.keyword("limit"),
    filteredSitePatientPage.limit,
    transit.keyword("offset"),
    filteredSitePatientPage.offset,
    transit.keyword("totalResults"),
    filteredSitePatientPage.totalResults,
    transit.keyword("sitePatients"),
    filteredSitePatientPage.sitePatients.map(filteredSitePatientTransit),
  ]);

  return filteredSitePatientPageTransit;
};

export const generateFilteredSitePatientPageTransit = (
  filteredSitePatientPage: FilteredSitePatientPageResponse
): string => {
  const transitFilteredSitePatientPage = FilteredSitePatientPageMap(
    filteredSitePatientPage
  );
  const transitJson = transitWriter.write(transitFilteredSitePatientPage);

  return transitJson;
};
