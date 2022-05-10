import {app, BrowserWindow, BrowserWindowConstructorOptions} from "electron";
import {enable} from "@electron/remote/main";
import * as path from "path";

const constructorOptions: BrowserWindowConstructorOptions = {
	show: false,
	autoHideMenuBar: true,
	alwaysOnTop: true,
	webPreferences: {
		nodeIntegration: true,
		contextIsolation: false
	}
};

export default class Browser extends BrowserWindow {
	constructor() {
		super(constructorOptions);
		enable(this.webContents);
	}

	public init = () => {
		if (config.mode === "development") return this.loadURL("http://localhost:3000/");
		return this.loadURL(path.join("file://", app.getAppPath(), "dist/renderer/index.html"));
	};
}
