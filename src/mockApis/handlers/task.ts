import { rest } from "msw";

const taskHandlers = {
  getTaskOverview: () =>
    rest.get(`/api/tasks/v1/overview`, (_req, res, ctx) => {
      return res(ctx.json({ "due-today": 3, overdue: 5 }));
    }),
};

export default taskHandlers;
