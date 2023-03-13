import { defineWorkspace } from "roserepo";

import { ViteExecutor } from "@roserepo/vite";

export default defineWorkspace({
  executor: {
    dev: new ViteExecutor({
      extends: "build",
      type: "dev",
      config: {
        server: {
          port: 5432,
        },
      },
    }),
    build: new ViteExecutor({
      type: "build",
      config: {
        base: "",
        esbuild: {
          keepNames: true,
        },
      },
    })
  },
});