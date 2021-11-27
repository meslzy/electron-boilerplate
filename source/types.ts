import Browser from "./browser";
import Tray from "./tray";

declare global {
  namespace NodeJS {
    interface Global {
      env: "development" | "production";
      browser: Browser;
      tray: Tray;
    }
  }
}
