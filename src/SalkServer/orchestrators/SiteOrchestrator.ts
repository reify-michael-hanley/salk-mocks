import { characters } from "legacyDemoData/starwars";
import { mockPatient } from "mockData/patient";
import { mockSite } from "mockData/site";
import { mockSitePatient } from "mockData/sitePatient";
import { Patient } from "types/Patient";
import { PatientAggregate } from "types/PatientAggregate";
import { SitePatient } from "types/SitePatient";
import { TrialOrchestrator } from "./TrialOrchestrator";

// export const patients = characters.map((character) =>
//   mockPatient({ name: character })
// );

export const patients = Array.from(
  [...characters, ...new Array(105 - characters.length)],
  (character) => {
    const override = character ? { name: character } : {};
    return mockPatient(override);
  }
);

export const SiteOrchestrator = () => {
  const site = mockSite();

  const sitePatients = patients.map((patient) =>
    mockSitePatient({ "site-id": site.id, "patient-id": patient.id })
  );

  function getSitePatients(): SitePatient[];
  function getSitePatients(sitePatientId: string): SitePatient;
  function getSitePatients(sitePatientId?: string) {
    if (sitePatientId) {
      return sitePatients.find(
        (sitePatient) => sitePatient.id === sitePatientId
      );
    } else return sitePatients;
  }

  return {
    getSite: () => site,
    getPatientAggregates: (trialId: string): PatientAggregate[] => {
      const patientAggregates: PatientAggregate[] = [];

      for (const patient of patients) {
        const sitePatient = sitePatients.find(
          (sitePatient) => patient.id === sitePatient.id
        );

        if (!sitePatient) continue;

        const siteTrialPatient = TrialOrchestrator(site.id).getSiteTrialPatient(
          trialId,
          patient.id
        );

        if (!siteTrialPatient) continue;

        const patientAggregate: PatientAggregate = {
          id: patient.id,
          patient: patient,
          "site-patient": sitePatient,
          "site-trial-patient": siteTrialPatient,
        };

        patientAggregates.push(patientAggregate);
      }

      return patientAggregates;
    },
    trials: TrialOrchestrator(site.id),
    sitePatients: {
      /** Returns all site patients.
       *
       *  if a site patient id is given, that site patient is returned.
       *
       *  if that site patient is not found, undefined is returned.
       *
       *  @param {string} sitePatientId
       *  @returns SitePatient | SitePatient[] | undefined
       */
      get: getSitePatients,
      add: (patient: Patient): void => {
        const sitePatient = mockSitePatient({
          "site-id": site.id,
          "patient-id": patient.id,
        });
        sitePatients.push(sitePatient);
      },
    },
  };
};
