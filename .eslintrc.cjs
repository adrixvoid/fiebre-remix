/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node", "prettier"],
  rules: {
    "eol-last": ["error", "always"],
    "no-console": "on",
    "no-process-exit": "on",
    "no-undef": "on",
    "no-unused-vars": "on",
    "no-useless-escape": "on"
  }
};
