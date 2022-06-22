import { rest } from "msw";

const fallbackHandlers = {
  get: rest.get(`*`, (_req, res, ctx) => {
    return res(ctx.json({ error: "Please add a request handler." }));
  }),
  put: rest.put(`*`, (_req, res, ctx) => {
    return res(ctx.json({ error: "Please add a request handler." }));
  }),
  post: rest.post(`*`, (_req, res, ctx) => {
    return res(ctx.json({ error: "Please add a request handler." }));
  }),
  patch: rest.patch(`*`, (_req, res, ctx) => {
    return res(ctx.json({ error: "Please add a request handler." }));
  }),
  delete: rest.delete(`*`, (_req, res, ctx) => {
    return res(ctx.json({ error: "Please add a request handler." }));
  }),
};

export default fallbackHandlers;
