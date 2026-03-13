import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "node_modules",
      "coverage",
      "dist",
      "build"
    ]
  },

  {
    files: ["**/*.{js,mjs,cjs}"],

    plugins: { js },

    extends: ["js/recommended"],

    languageOptions: {
      globals: {
        ...globals.node,

        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly"
      }
    }
  }
]);