export {};

declare global {
  interface Window {
    env: "development" | "production";
  }
}
