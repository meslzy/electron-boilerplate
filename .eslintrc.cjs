module.exports = {
  root: true,
  extends: [
    "@meslzy/eslint-config",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.json",
      "./electron/*/tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
  },
  settings: {
    next: {
      rootDir: "electron/renderer",
    },
  },
};