#!/usr/bin/env bash
# Builds the app and assembles a self-contained deploy folder at
# .next/standalone, ready to hand to cPanel's "Setup Node.js App".
#
# `next build` with `output: "standalone"` (see next.config.ts) produces a
# minimal server.js plus only the server-side dependencies actually used —
# but it does NOT copy the public/ folder or .next/static (Next's own docs
# call this out explicitly), so this script does that last step.
#
# Usage: run this ON THE SERVER, after `npm install` and after exporting any
# NEXT_PUBLIC_* env vars the build needs (see DEPLOY.md) — those are baked
# into the client bundle at build time, not read at runtime.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> Building (next build)"
npm run build

echo "==> Copying public/ into the standalone bundle"
rm -rf .next/standalone/public
cp -r public .next/standalone/public

echo "==> Copying .next/static into the standalone bundle"
mkdir -p .next/standalone/.next/static
cp -r .next/static/. .next/standalone/.next/static/

echo "==> Done. Deployable app is at: .next/standalone"
echo "    cPanel Node.js App startup file should point at: .next/standalone/server.js"
