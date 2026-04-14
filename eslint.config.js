import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: {...globals.browser, ...globals.node, google:"readonly", initSearchBar:"writable", initReviews:"writable", initCookieBanner:"writable", reAcceptCookies:"writable" } },
  rules: {
    "no-unused-vars": ["error",{varsIgnorePattern: "initSearchBar|initReviews|initCookieBanner|reAcceptCookies"}]
  }
}
]);