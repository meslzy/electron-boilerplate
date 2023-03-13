import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    entry: [
      "source/index.ts",
    ],
    format: [
      "cjs",
    ],
    clean: true,
    keepNames: true,
    shims: true,
    external: [
      "electron",
    ],
    noExternal: [
      /^@packages/,
      "electron-store",
      "@electron/remote",
    ]
  };
});