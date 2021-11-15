import {app} from "electron";

import Browser from "./browser";
import Tray from "./tray";

const secondInstance = () => {
  // args (event, commandLine, workingDirectory)
  
  if (global.browser) {
    global.browser.isVisible() ? global.browser.focus() : global.browser.show();
  }
};
const ready = async () => {
  global.browser = new Browser();
  global.tray = new Tray();
  
  global.tray.init();
  
  global.browser.init().then(() => {
    global.browser.show();
  });
};

const init = () => {
  global.env = process.env.NODE_ENV as "development" | "production";
  
  app.on("second-instance", secondInstance);
  app.on("activate", init);
  app.on("ready", ready);
};

app.requestSingleInstanceLock() ? init() : app.quit();
