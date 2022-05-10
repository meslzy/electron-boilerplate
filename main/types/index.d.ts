import Config from "source/utility/config";

import Tray from "source/tray";
import Browser from "source/browser";

declare global {
	let config: Config;
	let tray: Tray;
	let browser: Browser;
}

declare global {
	namespace NodeJS {
		export interface Global {
			config: Config;
			tray: Tray;
			browser: Browser;
		}
	}
}
