import { setupWorker } from "msw";
import {
  SiteHandlers,
  SiteTrialHandlers,
  SiteTrialPatientHandlers,
  TaskHandlers,
} from "./handlers";
// import fallbackHandlers from "./handlers/fallback";

const handlers = [
  ...Object.values(SiteHandlers),
  ...Object.values(SiteTrialHandlers),
  ...Object.values(SiteTrialPatientHandlers),
  ...Object.values(TaskHandlers),
  // ...Object.values(fallbackHandlers),
];

export const mockWorker = setupWorker(...handlers);
