module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "prettier", // Extiende Prettier
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: ["/lib/**/*", "/generated/**/*"],
  plugins: [
    "@typescript-eslint",
    "import",
    "prettier", // Incluye el plugin Prettier
  ],
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    indent: ["error", 2],
    "object-curly-spacing": ["error", "always"], // Permite espacios
    "prettier/prettier": ["error"], // Asegúrate de que las reglas de Prettier se apliquen
  },
};
