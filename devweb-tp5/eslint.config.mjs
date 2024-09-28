import globals from "globals";
import pluginJs from "@eslint/js";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginSecurity from "eslint-plugin-security";
import pluginNode from "eslint-plugin-node";
import pluginImport from "eslint-plugin-import";
import pluginPromise from "eslint-plugin-promise";
import prettier from "eslint-config-prettier";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, 
        ...globals.es2021,
        ...globals.node, 
        ...globals.es6
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
  },
  pluginJs.configs.recommended, // Recommandations de base ESLint
  pluginNode.configs.recommended, // Recommandations pour Node.js
  pluginSecurity.configs.recommended, // Recommandations de sécurité
  pluginImport.configs.recommended, // Gestion des imports
  pluginUnicorn.configs.recommended, // Recommandations spécifiques à Unicorn
  pluginPromise.configs.recommended, // Recommandations pour les promesses
  prettier, // Préttier pour le formatage
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
