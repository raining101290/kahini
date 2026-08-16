#!/usr/bin/env node
// Runs after `npm install`, but only does anything when explicitly asked to
// (via CPANEL_BUILD=1) — this is what lets cPanel's "Run NPM Install"
// button, the only build trigger available without shell access, also
// produce a full production build. Ordinary local `npm install` (no shell
// access needed there — you have a terminal) is unaffected and stays fast.
//
// See DEPLOY.md for the full walkthrough.
if (process.env.CPANEL_BUILD !== "1") {
  process.exit(0);
}

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

// Don't trust process.cwd() OR npm_package_json — on this host, cPanel's
// "Run NPM Install" (CloudLinux's Node Selector) runs the install with both
// pointed at the Node virtualenv folder, not the actual project directory
// (apparently it copies just package.json in there to do the install). The
// one thing we can trust is __dirname: wherever this file physically is on
// disk, which is only ever reached at all via the absolute path hardcoded
// in package.json's "postinstall" script for exactly this reason.
const root = path.join(__dirname, "..");

console.log(`[postinstall-build] CPANEL_BUILD=1 — running production build in ${root}...`);
execSync("npx next build", { cwd: root, stdio: "inherit" });

// `output: "standalone"` (next.config.ts) traces only the runtime deps
// actually used into .next/standalone, including a self-contained
// server.js — but it deliberately leaves out public/ and .next/static
// (Next's own docs call this out). Normally that's a one-line `cp -r` in a
// shell; done here in plain Node so it works with no shell access at all.
const standalone = path.join(root, ".next", "standalone");

console.log("[postinstall-build] copying public/ into the standalone bundle...");
fs.cpSync(path.join(root, "public"), path.join(standalone, "public"), {
  recursive: true,
});

console.log("[postinstall-build] copying .next/static into the standalone bundle...");
fs.cpSync(
  path.join(root, ".next", "static"),
  path.join(standalone, ".next", "static"),
  { recursive: true }
);

console.log("[postinstall-build] done — startup file is .next/standalone/server.js");
