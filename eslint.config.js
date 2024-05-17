const prettier = require("eslint-plugin-prettier");

module.exports = [
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
    ignores: ["*.config.*", ".vite/*/**"],
  },
];
