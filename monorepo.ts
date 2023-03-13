import {Cache, defineMonorepo, Runner} from "roserepo";

export default defineMonorepo({
  runner: {
    dev: Runner.pipeline({
      parallel: true,
      env: {
        "NODE_ENV": "development",
      },
    }),
    start: Runner.pipeline({
      parallel: true,
      selfScripts: [
        "build",
      ],
      dependencyScripts: [
        "build",
      ],
    }),
    build: Runner.pipeline({
      parallel: true,
      throwOnError: true,
      cache: Cache.files({
        pattern: [
          "source/**",
          "dist/**",
          "package.json",
          "workspace.ts",
          "{monorepoDir}/package.json",
          "{monorepoDir}/monorepo.ts",
        ],
      }),
    }),
    lint: Runner.many({
      parallel: true,
      cache: Cache.files({
        pattern: [
          "source/**/*",
          ".eslintrc.cjs",
          "{monorepoDir}/.eslintrc.cjs",
        ],
      }),
    }),
  },
});