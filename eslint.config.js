import js from "@eslint/js";
import globals from "globals";
import SimpleImportSort from "eslint-plugin-simple-import-sort";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },

    plugins: { "simple-import-sort": SimpleImportSort },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^react-dom$", "^react"],
            ["^@/"],
            ["^\\.\\.", "^\\."],
          ],
        },
      ],
    },
  },
]);
