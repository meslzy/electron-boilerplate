import { BrowserWindow } from "electron";
import { enable } from "@electron/remote/main";

import { isDev } from "@packages/env";
import { rootDir } from "@packages/paths";

class MainWindow extends BrowserWindow {
  constructor() {
    super({
      title: "Electron Boilerplate",
      autoHideMenuBar: true,
      show: false
    });

    this.webContents.on("page-title-updated", ( event ) => {
      return event.preventDefault();
    });

    enable(this.webContents);
  }

  public init = () => {
    if ( isDev ) {
      return this.loadURL("http://localhost:5432");
    }

    return this.loadURL(`file://${ rootDir }/electron/renderer/dist/index.html`);
  };
}

export default MainWindow;