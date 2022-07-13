import { faker } from "@faker-js/faker";
import { planets } from "legacyDemoData/starwars";
import { mockSiteTrial } from "mockData/siteTrial";
import { SiteTrialPatientStageType } from "types/PatientAggregate";
import { SiteTrial } from "types/SiteTrial";
import { SiteTrialPatient } from "types/SiteTrialPatient";

export const TrialOrchestrator = (siteId: string) => {
  const trials = planets.map((planet) => {
    return mockSiteTrial({ name: planet, "site-id": siteId });
  });

  const siteTrialPatients: { [siteTrialId: string]: SiteTrialPatient[] } = {};

  /**
   * @returns all site trials
   */
  function getSiteTrials(): SiteTrial[];
  /** @returns the site trial specified or undefined if not found */
  function getSiteTrials(trialId: string): SiteTrial | undefined;
  function getSiteTrials(trialId?: string) {
    if (trialId) return trials.find((trial) => trial.id === trialId);
    else return trials;
  }

  return {
    get: getSiteTrials,
    add: (siteTrial: SiteTrial) => {
      trials.push(siteTrial);
    },
    ids: () => trials.map((trial) => trial.id),
    getSiteTrialPatient: (trialId: string, patientId: string) => {
      const siteTrialPatient = siteTrialPatients[trialId].find(
        (patient) => patient.id === patientId
      );

      return siteTrialPatient;
    },
    /** returns all site trial patients associated with a site patient */
    getSiteTrialPatientsById: (patientId: string): SiteTrialPatient[] => {
      const patientTrials: SiteTrialPatient[] = [];
      for (const trialPatients of Object.values(siteTrialPatients)) {
        const trialPatient = trialPatients.find(
          (trialPatient) => trialPatient["site-patient-id"] === patientId
        );

        if (!trialPatient) continue;
        patientTrials.push(trialPatient);
      }

      return patientTrials;
    },
    /** returns all trials associated with a patient */
    getPatientTrials: (patientId: string): SiteTrial[] => {
      const trials: SiteTrial[] = [];
      for (const trialPatients of Object.values(siteTrialPatients)) {
        const trialPatient = trialPatients.find(
          (trialPatient) => trialPatient["site-patient-id"] === patientId
        );

        if (!trialPatient) continue;
        const trialId = trialPatient["site-trial-id"];
        const trial = getSiteTrials(trialId);

        if (!trial)
          throw new Error(`No Site trial found for the given ID: ${trialId}`);

        trials.push(trial);
      }

      return trials;
    },
    addPatientToTrial: (
      trialId: string,
      sitePatientId: string,
      stage: SiteTrialPatientStageType
    ): SiteTrialPatient => {
      const newSiteTrialPatient = {
        stage,
        id: faker.datatype.uuid(),
        "site-patient-id": sitePatientId,
        "site-trial-id": trialId,
        "created-at": new Date(),
        "owner-id": faker.datatype.uuid(),
        "patient-number": faker.random.numeric(4),
      };

      if (!siteTrialPatients[trialId]) siteTrialPatients[trialId] = [];

      const siteTrialPatient = siteTrialPatients[trialId].find(
        (siteTrialPatient) =>
          siteTrialPatient["site-patient-id"] === sitePatientId
      );

      if (siteTrialPatient) {
        siteTrialPatient.stage = stage;
        return siteTrialPatient;
      } else {
        siteTrialPatients[trialId].push(newSiteTrialPatient);
        return newSiteTrialPatient;
      }
    },
  };
};
