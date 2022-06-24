export type FuseboxObject = {
  id: string;
  namespace: string;
  name: string;
  description: string;
  "created-at": Date;
  "enabled?": null | boolean;
};

export type Fusebox = {
  "salk/race-and-ethnicity": FuseboxObject;
  "study-team/enable-pii-fields": FuseboxObject;
};
