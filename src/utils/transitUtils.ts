import * as transit from "transit-js";

const transitDateHandler = transit.makeWriteHandler({
  tag: () => "java.time.Instant",
  rep: (date: Date) => date.getTime(),
  stringRep: () => null,
});

export const transitWriter = transit.writer("json", {
  handlers: transit.map([Date, transitDateHandler]),
});
