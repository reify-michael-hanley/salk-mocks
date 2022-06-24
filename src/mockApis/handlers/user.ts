import { mockCurrentUser } from "mockData/currentUser";
import { rest } from "msw";
import { generateCurrentUserTransit } from "transit/currentUser";
import { CurrentUser } from "types/CurrentUser";
import { ApiMockOverrideType } from "types/MockApiTypes";

const userHandlers = {
  getCurrentUser: (overrides?: ApiMockOverrideType<CurrentUser>) => {
    const status = overrides?.status ?? 200;

    const currentUserResponse = overrides?.response ?? mockCurrentUser;

    return rest.get(`/api/salk/user/:userId`, (req, res, ctx) => {
      const userId = req.params.userId as string;
      currentUserResponse.id = userId;
      const currentUserTransit =
        generateCurrentUserTransit(currentUserResponse);

      return res(
        ctx.status(status),
        ctx.set("Content-Type", "application/transit+json;charset=UTF-8"),
        ctx.body(currentUserTransit)
      );
    });
  },
};

export default userHandlers;
