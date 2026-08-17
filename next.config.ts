import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // cPanel's LVE memory cap (4GB) is enforced per-account, aggregated
  // across ALL of that account's processes at once — not per individual
  // process. next build normally spawns several parallel worker
  // processes for compilation; even though each native binary loads
  // fine in isolation (see scripts/diagnose-native.js), their combined
  // memory footprint under one shared ceiling can still trip a
  // WebAssembly OOM in whichever worker happens to touch it. Force
  // single-worker (sequential) compilation to keep peak memory well
  // under the cap, at the cost of a slower build.
  experimental: {
    cpus: 1,
  },
  // cPanel's "Setup Node.js App" (Passenger) runs a plain Node entry file
  // rather than `next start` directly, and shared hosting often can't
  // afford a full `node_modules` install on the server. Standalone output
  // traces only the dependencies actually used at runtime into
  // `.next/standalone`, including a self-contained `server.js` — see
  // DEPLOY.md for the full build/upload steps.
  output: "standalone",
};

export default nextConfig;
