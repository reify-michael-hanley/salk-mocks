import { setupWorker } from "msw";
import {
  SiteHandlers,
  SiteTrialHandlers,
  SiteTrialPatientHandlers,
  TaskHandlers,
  SalkHandlers,
  UserHandlers,
} from "./handlers";
// import fallbackHandlers from "./handlers/fallback";

const handlers = [
  ...Object.values(SiteHandlers).map((handler) => handler()),
  ...Object.values(SiteTrialHandlers).map((handler) => handler()),
  ...Object.values(SiteTrialPatientHandlers).map((handler) => handler()),
  ...Object.values(TaskHandlers).map((handler) => handler()),
  ...Object.values(SalkHandlers).map((handler) => handler()),
  ...Object.values(UserHandlers).map((handler) => handler()),
  // ...Object.values(fallbackHandlers),
];

export const mockWorker = setupWorker(...handlers);
