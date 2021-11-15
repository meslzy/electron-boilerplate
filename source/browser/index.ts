import {BrowserWindow, BrowserWindowConstructorOptions, ipcMain} from "electron";
import path from "path";

const constructorOptions: BrowserWindowConstructorOptions = {
  show: false,
  frame: false,
  alwaysOnTop: true,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  }
};

export default class Browser extends BrowserWindow {
  private readonly url: string = null;
  
  constructor() {
    super(constructorOptions);
    
    this.url = global.env === "development" ? "http://localhost:3000/" : path.join("file://", __dirname, "index.html");
    
    if (global.env === "production") {
      this.removeMenu();
      this.setAlwaysOnTop(false);
    }
    
    this.on("close", () => {
      global.browser = null;
    });
  }
  
  public static init = () => {
    ipcMain.on("close", () => {
      if (global.browser && global.browser.closable) {
        global.browser.close();
      }
    });
    ipcMain.on("minimize", () => {
      if (global.browser && global.browser.minimizable) {
        global.browser.minimize();
      }
    });
  };
  
  public init = () => this.loadURL(this.url);
}

Browser.init();
