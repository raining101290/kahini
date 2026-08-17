import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // `next build` runs ESLint by default, which on this host pulls in
  // eslint-import-resolver-typescript -> unrs-resolver, whose native
  // binary fails to load under cPanel's LVE/CageFS restrictions (falls
  // back to a WASM build that then OOMs under the 4GB memory cap — see
  // DEPLOY.md). Linting still runs fine locally/in your editor; it just
  // shouldn't gate the production build on this host.
  eslint: {
    ignoreDuringBuilds: true,
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
