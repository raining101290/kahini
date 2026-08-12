import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
