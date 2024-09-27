import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Gardez les globals pour le navigateur
        ...globals.node, // Ajoutez les globals pour Node.js
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // Ajoutez vos règles personnalisées ici, si nécessaire
    },
  },
];
