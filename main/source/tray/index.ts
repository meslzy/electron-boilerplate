import {app, nativeImage, Tray} from "electron";

import * as path from "path";

const icon = nativeImage.createFromPath(path.join(app.getAppPath(), "resources", "icon.png"));

export default class extends Tray {
	constructor() {
		super(icon.resize({width: 16, height: 16}));
	}
}
