import { faker } from "@faker-js/faker";
import { characters, planets } from "legacyDemoData/starwars";
import { mockPatient } from "mockData/patient";
import { mockPatientAggregate } from "mockData/patientAggregate";
import { mockSite } from "mockData/site";
import { mockSitePatient } from "mockData/sitePatient";
import { mockSiteTrial } from "mockData/siteTrial";
import { Patient } from "types/Patient";
import { Site } from "types/Site";
import { SitePatient } from "types/SitePatient";
import { SiteTrial } from "types/SiteTrial";

// class SiteController {
//   private _site: Site;
//   private _trials: Map<string, SiteTrial>;
//   constructor() {
//     this._site = mockSite();
//     const trials = planets.map((planet) =>
//       mockSiteTrial({ name: planet, "site-id": this._site.id })
//     );
//     trials.forEach((trial) => this._trials.set(trial.id, trial));
//   }

//   get site() {
//     return this._site;
//   }

//   getSiteTrialById(id: string) {
//     return this._trials.get(id);
//   }

//   getAllSiteTrials() {
//     return this._trials.values();
//   }

//   getSiteTrialIds() {
//     return this._trials.keys();
//   }

//   addSiteTrial(siteTrial: SiteTrial) {
//     this._trials.set(siteTrial.id, siteTrial);
//   }
// }

// export default new SiteController();
const patients = characters.map((character) =>
  mockPatient({ name: character })
);

const trialOrchestrator = (siteId: string) => {
  const trials = planets.map((planet) => {
    return mockSiteTrial({ name: planet, "site-id": siteId });
  });
  /**
   * @returns all site trials
   */
  function get(): SiteTrial[];
  /** @returns the site trial specified or undefined if not found */
  function get(trialId?: string): SiteTrial | undefined;
  function get(trialId?: string) {
    if (trialId) return trials.find((trial) => trial.id === trialId);
    else return trials;
  }

  return {
    get,
    add: (siteTrial: SiteTrial) => {
      trials.push(siteTrial);
    },
    ids: () => trials.map((trial) => trial.id),
  };
};

export const SiteOrchestrator = () => {
  const site = mockSite();

  const trials = planets.map((planet) => {
    return mockSiteTrial({ name: planet, "site-id": site.id });
  });

  const sitePatients = patients.map((patient) =>
    mockSitePatient({ "site-id": site.id, "patient-id": patient.id })
  );

  return {
    getSite: () => site,
    trials: trialOrchestrator(site.id),
    // {
    //   /** Returns all site trials.
    //    *
    //    *  if a site trial id is given, that trial is returned.
    //    *
    //    *  if that site trial is not found, undefined is returned.
    //    *
    //    *  @param {string} trialId
    //    *  @returns SiteTrial | SiteTrial[] | undefined
    //    */
    //   get: (trialId?: string): SiteTrial | SiteTrial[] | undefined => {
    //     if (trialId) return trials.find((trial) => trial.id === trialId);
    //     else return trials;
    //   },
    //   /** adds a trial to the site */
    //   add: (siteTrial: SiteTrial) => {
    //     trials.push(siteTrial);
    //   },
    //   /** @returns all site trial ids */
    //   ids: () => trials.map((trial) => trial.id),
    // },
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
      get: (sitePatientId: string): SitePatient | SitePatient[] | undefined => {
        if (sitePatientId) {
          return sitePatients.find(
            (sitePatient) => sitePatient.id === sitePatientId
          );
        } else return sitePatients;
      },
      add: (patient: Patient) => {
        const sitePatient = mockSitePatient({
          "site-id": site.id,
          "patient-id": patient.id,
        });
        sitePatients.push(sitePatient);
      },
    },
  };
};
