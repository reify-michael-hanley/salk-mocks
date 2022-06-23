import { rest } from "msw";

const SiteTrialPatientHandlers = {
  editSubjectId: () =>
    rest.put<{ "subject-id": string }>(
      `/api/salk/site-trial-patient/:siteTrialPatientId/subject-id`,
      (req, res, ctx) => {
        const subjectId = req.body["subject-id"];

        if (typeof subjectId !== "string") {
          return res(
            ctx.status(400),
            ctx.json(`'subjectId' (${subjectId}) must be a string`)
          );
        }

        return res(ctx.status(204));
      }
    ),
};

export default SiteTrialPatientHandlers;
