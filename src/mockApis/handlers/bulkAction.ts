import { mockAddPatientToTrialResponse } from "mockData/addPatientToTrialResponse";
import { generateAddPatientToTrialResponseTransit } from "transit/addPatientToTrial";
import { rest } from "msw";
import { ApiMockOverrideCallback } from "types/MockApiTypes";
import { AddPatientToTrialResponse } from "types/responseTypes/AddPatientToTrialResponse";

const bulkActionHandlers = {
  /** POST `api/salk/bulk-action/add-patients-to-trials` */
  postAddPatientToTrials: (
    overrides?: ApiMockOverrideCallback<AddPatientToTrialResponse>
  ) => {
    return rest.post<string>(
      `/api/salk/bulk-action/add-patients-to-trials`,
      (req, res, ctx) => {
        const { body = mockAddPatientToTrialResponse(req.body), status = 201 } =
          overrides?.(req) || {};

        const transitBody = generateAddPatientToTrialResponseTransit(body);

        return res(
          ctx.status(status),
          ctx.set("Content-Type", "application/transit+json"),
          ctx.body(transitBody)
        );
      }
    );
  },
};

export default bulkActionHandlers;
