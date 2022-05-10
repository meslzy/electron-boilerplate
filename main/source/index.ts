import {app} from "electron";
import {initialize} from "@electron/remote/main";

import Config from "./utility/config";

import Tray from "./tray";
import Browser from "./browser";

class App {
	primaryInstance: boolean;

	constructor() {
		this.primaryInstance = app.requestSingleInstanceLock();
	}

	public init = () => {
		if (this.primaryInstance) {
			app.on("ready", this.ready);
		} else {
			app.quit();
		}
	};

	private ready = () => {
		initialize();

		global.config = new Config();

		global.tray = new Tray();
		global.browser = new Browser();

		browser.init().then(() => {
			browser.show();
		});
	};
}

(new App()).init();
