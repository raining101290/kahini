#!/usr/bin/env node
// One-shot diagnostic for the WASM OOM seen during `next build` on this
// host. Run via cPanel's "Run JS Script" (script: diagnose, no parameters).
// Tries to load the same native binaries Next.js/Tailwind fall back from
// when something's wrong, and reports exactly what breaks and why —
// without needing shell access to inspect the server directly.

console.log("--- environment ---");
console.log("platform:", process.platform, "arch:", process.arch);
console.log("node:", process.version);
try {
  const report = process.report.getReport();
  console.log("glibc (if applicable):", report.header.glibcVersionRuntime || "n/a");
} catch (e) {
  console.log("could not read process.report:", e.message);
}
try {
  const fs = require("node:fs");
  console.log("/etc/os-release:\n" + fs.readFileSync("/etc/os-release", "utf8"));
} catch (e) {
  console.log("could not read /etc/os-release:", e.message);
}

function tryRequire(label, id) {
  console.log(`\n--- ${label} (${id}) ---`);
  try {
    const resolved = require.resolve(id);
    console.log("resolved path:", resolved);
    require(id);
    console.log("OK: loaded successfully");
  } catch (e) {
    console.log("FAILED:", e.message);
    if (e.stack) console.log(e.stack.split("\n").slice(0, 5).join("\n"));
  }
}

// Next.js's native compiler — exact package name depends on the server's
// platform/libc, so try the ones most likely for a CloudLinux/AlmaLinux
// (glibc) x64 host, and let failures tell us if it's actually musl instead.
tryRequire("SWC native (glibc)", "@next/swc-linux-x64-gnu");
tryRequire("SWC native (musl)", "@next/swc-linux-x64-musl");

// Tailwind v4's CSS AST/minifier — same story.
tryRequire("lightningcss native (glibc)", "lightningcss-linux-x64-gnu");
tryRequire("lightningcss native (musl)", "lightningcss-linux-x64-musl");

// Tailwind v4's core scanning/compilation engine — a SEPARATE native
// binary from lightningcss, with its own explicit WASM fallback package
// (@tailwindcss/oxide-wasm32-wasi). This was the one that turned out to
// be missing after lightningcss was already fixed.
tryRequire("@tailwindcss/oxide native (glibc)", "@tailwindcss/oxide-linux-x64-gnu");
tryRequire("@tailwindcss/oxide native (musl)", "@tailwindcss/oxide-linux-x64-musl");

// sharp — Next's optional image-processing dependency, touched during
// `next build` for local image imports. Separate WASM fallback package:
// @img/sharp-wasm32.
tryRequire("sharp native (glibc)", "@img/sharp-linux-x64");
tryRequire("sharp native (musl)", "@img/sharp-linuxmusl-x64");

// unrs-resolver — pulled in by eslint-import-resolver-typescript, which
// runs during next build's lint step. Separate WASM fallback package:
// @unrs/resolver-binding-wasm32-wasi.
tryRequire("unrs-resolver native (glibc)", "@unrs/resolver-binding-linux-x64-gnu");
tryRequire("unrs-resolver native (musl)", "@unrs/resolver-binding-linux-x64-musl");

// If we get this far, try to directly provoke the same WASM path Next/
// Tailwind fall back to, to see the raw underlying error in isolation.
console.log("\n--- direct WebAssembly.instantiate sanity check ---");
try {
  const tinyModule = new WebAssembly.Module(
    Uint8Array.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00])
  );
  new WebAssembly.Instance(tinyModule);
  console.log("OK: a minimal empty WASM module instantiates fine");
} catch (e) {
  console.log("FAILED even on a trivial empty module:", e.message);
}

console.log("\n--- done ---");
