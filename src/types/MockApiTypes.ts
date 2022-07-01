import { DefaultBodyType, PathParams, RestRequest } from "msw";

export type ApiMockOverrideCallback<T> = (
  req: RestRequest<DefaultBodyType | never, PathParams<string>>
) => ApiOverrideResponse<T>;

export type ApiOverrideResponse<T> = {
  body?: T;
  status?: number;
};
