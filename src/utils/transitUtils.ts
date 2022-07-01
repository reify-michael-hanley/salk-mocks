import * as transit from "transit-js";

const transitDateHandler = transit.makeWriteHandler({
  tag: () => "java.time.Instant",
  rep: (date: Date) => date.getTime(),
  stringRep: () => null,
});

export const transitWriter = transit.writer("json", {
  handlers: transit.map([Date, transitDateHandler]),
});

export const transitReader = transit.reader("json", {
  mapBuilder: {
    init: () => new Map(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    add: (ret: Map<string, any>, key, val) => {
      if (val.map) {
        const keys: string[] = val.map._keys;
        const mapValues = keys.map((key) => {
          return val.map.map[key][0];
        });
        return ret.set(key._name, mapValues);
      } else {
        return ret.set(key._name, val._name);
      }
    },
    finalize: (val) => Object.fromEntries(val),
  },
  handlers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    u: (v: any) => v.toString(),
  },
});

export const transitRead = <T>(value: string) => {
  return transitReader.read(value) as T;
};
