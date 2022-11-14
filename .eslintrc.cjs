/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "no-unused-vars": "warn",
    "no-empty": "warn",
    "no-empty-function": "warn",
    "no-useless-constructor": "warn",
    "no-useless-return": "warn",
    // allow paren-less arrow functions
    "arrow-parens": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // allow console during development
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // double quotes
    quotes: ["error", "double"],
  },
}
