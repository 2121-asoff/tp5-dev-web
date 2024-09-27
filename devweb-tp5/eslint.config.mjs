import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, 
        ...globals.node, 
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        "ForInStatement"
      ],
      "no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_"
        }
      ],
    },
  },
];
