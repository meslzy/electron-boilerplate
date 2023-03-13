const isDev = process.env.node_env === "development";
const isProduction = process.env.node_env !== "development";

export {
  isDev,
  isProduction,
};