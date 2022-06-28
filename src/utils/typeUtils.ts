export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U> ? Array<Value<U>> : Value<T[P]>;
};
type AllowedPrimitives = boolean | string | number | Date;

type Value<T> = T extends AllowedPrimitives ? T : RecursivePartial<T>;
