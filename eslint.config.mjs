import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Standalone Node/shell tooling for deployment, not app source — runs
    // via plain `node`/`bash` outside the app's module system, so it
    // intentionally uses CommonJS `require` rather than the app's ESM style.
    "scripts/**",
  ]),
]);

export default eslintConfig;
