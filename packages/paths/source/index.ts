import { app } from "electron";

const rootDir = process.env.roserepo ? (
  process.env.monorepo_dir
) : (
  app.getAppPath()
);

export {
  rootDir,
};