#!/usr/bin/env node
// Isolates whether Next's own loadBindings() (used to transpile
// next.config.ts, and for the real build) succeeds when called on its
// own, vs. inside a full `next build` invocation that's already loaded
// Next's entire internal module graph first. If this succeeds here but
// `next build` still OOMs, the crash isn't about SWC loading at all —
// it's cumulative memory pressure from loading Next's own code.
console.log("Memory before:", process.memoryUsage());
const { loadBindings } = require("next/dist/build/swc");
loadBindings()
  .then((b) => {
    console.log("SUCCESS — isWasm:", b.isWasm);
    console.log("Memory after:", process.memoryUsage());
  })
  .catch((e) => {
    console.log("FAILED:", e.message);
    console.log(e.stack);
  });
