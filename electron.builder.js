const path = require("path");
const builder = require("electron-builder");

builder.build({
	config: {
		productName: "Electron Boilerplate",
		artifactName: "${productName} setup (${version}).${ext}",
		// asar: false,
		// forceCodeSigning: true,
		directories: {
			buildResources: path.join(__dirname, "builder", "resources"),
			output: path.join(__dirname, "builder", "output", "${os} ${arch}"),
		},
		win: {
			target: ["nsis"],
			icon: "win/icon.ico",
			legalTrademarks: "(©) Meslzy.com - 2021",
			publisherName: "Meslzy"
		},
		nsis: {
			oneClick: false,
			perMachine: true,
			allowToChangeInstallationDirectory: true,
			installerIcon: "win/installerIcon.ico",
			uninstallerIcon: "win/uninstallerIcon.ico",
			license: "license.txt",
			deleteAppDataOnUninstall: true,
			displayLanguageSelector: true,
			multiLanguageInstaller: true,
			runAfterFinish: true,
			createDesktopShortcut: "always"
		},
		mac: {
			category: "public.app-category.utilities",
			icon: "mac/icon.icns",
			target: "pkg",
			darkModeSupport: true,
		},
		pkg: {
			license: "license.txt",
			installLocation: "/Applications",
			allowAnywhere: true,
			allowCurrentUserHome: true,
			allowRootDirectory: true,
			isVersionChecked: true,
			isRelocatable: false,
			overwriteAction: "upgrade"
		},
		"files": [
			"output/**/*",
			"static/**/*",
			"node_modules/**/*",
			"package.json"
		],
	},
}).catch((err) => {
	console.error(err);
});
