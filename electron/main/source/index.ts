import { app } from "electron";

import { initialize } from "@electron/remote/main";

import { initializeStore } from "./store";


import MainWindow from "./windows/main";

class App {
  mainWindow: MainWindow;

  constructor() {
    this.preset();

    app.on("ready", this.ready);
  }

  preset = () => {
    app.disableHardwareAcceleration();
  };

  private ready = async () => {
    const primaryInstance = app.requestSingleInstanceLock();

    if ( !primaryInstance ) {
      return app.quit();
    }

    initialize();
    initializeStore();

    this.mainWindow = new MainWindow();
    await this.mainWindow.init();
    this.mainWindow.show();
  };
}

(new App());