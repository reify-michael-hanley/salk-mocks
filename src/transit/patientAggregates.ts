import { Patient, PatientAggregate, SitePatient } from "types/PatientAggregate";
import * as transit from "transit-js";
import { transitWriter } from "utils/transitUtils";
import { SiteTrialPatient } from "types/SiteTrialPatient";

export const siteTrialPatientTransitMap = (
  siteTrialPatient: SiteTrialPatient
) => {
  const siteTrialPatientTransit = transit.map([
    transit.keyword("updated-at"),
    siteTrialPatient["updated-at"],
    transit.keyword("acknowledged-at"),
    siteTrialPatient["acknowledged-at"],
    transit.keyword("subject-id"),
    siteTrialPatient["subject-id"],
    transit.keyword("stage"),
    transit.keyword(siteTrialPatient.stage),
    transit.keyword("starred"),
    siteTrialPatient.starred,
    transit.keyword("planned-screening-date"),
    siteTrialPatient["planned-screening-date"],
    transit.keyword("site-patient-id"),
    transit.uuid(siteTrialPatient["site-patient-id"]),
    transit.keyword("date-consent-signed"),
    siteTrialPatient["date-consent-signed"],
    transit.keyword("patient-source-id"),
    siteTrialPatient["patient-source-id"],
    transit.keyword("screen-fail-reason"),
    siteTrialPatient["screen-fail-reason"],
    transit.keyword("acknowledged"),
    siteTrialPatient.acknowledged,
    transit.keyword("id"),
    transit.uuid(siteTrialPatient.id),
    transit.keyword("site-trial-id"),
    transit.uuid(siteTrialPatient["site-trial-id"]),
    transit.keyword("patient-number"),
    siteTrialPatient["patient-number"],
    transit.keyword("owner-id"),
    siteTrialPatient["owner-id"],
    transit.keyword("date-enrolled"),
    siteTrialPatient["date-enrolled"],
    transit.keyword("patient-log-comments"),
    siteTrialPatient["patient-log-comments"],
    transit.keyword("pre-screen-fail-reason"),
    siteTrialPatient["pre-screen-fail-reason"],
    transit.keyword("referral-patient-id"),
    siteTrialPatient["referral-patient-id"],
    transit.keyword("consent-form-version"),
    siteTrialPatient["consent-form-version"],
    transit.keyword("created-at"),
    siteTrialPatient["created-at"],
  ]);

  return siteTrialPatientTransit;
};

const sitePatientTransitMap = (sitePatient: SitePatient) => {
  const sitePatientTransit = transit.map([
    transit.keyword("bulk-import-payload-id"),
    transit.uuid(sitePatient["bulk-import-payload-id"]),
    transit.keyword("batch-id"),
    transit.uuid(sitePatient["batch-id"]),
    transit.keyword("mrn"),
    sitePatient.mrn,
    transit.keyword("id"),
    transit.uuid(sitePatient.id),
    transit.keyword("site-id"),
    transit.uuid(sitePatient["site-id"]),
    transit.keyword("patient-id"),
    transit.uuid(sitePatient["patient-id"]),
    transit.keyword("created-at"),
    sitePatient["created-at"],
    transit.keyword("owner-id"),
    sitePatient["owner-id"],
  ]);

  return sitePatientTransit;
};

const patientTransitMap = (patient: Patient) => {
  const patientTransit = transit.map([
    transit.keyword("updated-at"),
    patient["updated-at"],
    transit.keyword("address"),
    patient.address,
    transit.keyword("email"),
    patient.email,
    transit.keyword("preferred-pronouns-notes"),
    patient["preferred-pronouns-notes"],
    transit.keyword("preferred-pronouns"),
    patient["preferred-pronouns"],
    transit.keyword("name"),
    patient.name,
    transit.keyword("accessibility-reqs-notes"),
    patient["accessibility-reqs-notes"],
    transit.keyword("nickname"),
    patient.nickname,
    transit.keyword("employment-status"),
    patient["employment-status"],
    transit.keyword("id"),
    transit.uuid(patient.id),
    transit.keyword("owner-id"),
    patient["owner-id"],
    transit.keyword("gender"),
    patient.gender,
    transit.keyword("hobbies"),
    patient.hobbies,
    transit.keyword("created-at"),
    patient["created-at"],
    transit.keyword("restrict-processing"),
    patient["restrict-processing"],
  ]);

  return patientTransit;
};

export const patientAggregateTransitMap = (
  patientAggregate: PatientAggregate
) => {
  const patientAggregateTransit = transit.map([
    transit.keyword("id"),
    transit.uuid(patientAggregate.id),
    transit.keyword("site-trial-patient"),
    siteTrialPatientTransitMap(patientAggregate["site-trial-patient"]),
    transit.keyword("site-patient"),
    sitePatientTransitMap(patientAggregate["site-patient"]),
    transit.keyword("patient"),
    patientTransitMap(patientAggregate.patient),
  ]);

  return patientAggregateTransit;
};

export const generatePatientAggregateTransit = (
  patientAggregate: PatientAggregate[]
): string => {
  const transitPatientAggregate = patientAggregate.map(
    patientAggregateTransitMap
  );
  const transitJson = transitWriter.write(transitPatientAggregate);

  return transitJson;
};
