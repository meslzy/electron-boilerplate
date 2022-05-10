const path = require("path");
const builder = require("electron-builder");

builder.build({
  config: {
	  appId: "com.meslzy.electron-boilerplate",
	  productName: "Electron Boilerplate",
	  artifactName: "${productName} Setup (${version}).${ext}",
	  asar: true,
	  directories: {
		  buildResources: path.join(__dirname, "build", "resources"),
		  output: path.join(__dirname, "build", "dist", "${os} ${arch}"),
	  },
	  win: {
		  target: "nsis",
		  icon: "win/icon.png",
		  legalTrademarks: "(©) meslzy.com - 2021",
		  publisherName: "meslzy"
	  },
	  nsis: {
		  oneClick: false,
		  perMachine: true,
		  runAfterFinish: true,
		  installerIcon: "win/icon.ico",
		  uninstallerIcon: "win/icon.ico",
		  deleteAppDataOnUninstall: true,
		  displayLanguageSelector: true,
		  multiLanguageInstaller: true,
		  allowToChangeInstallationDirectory: true,
      createDesktopShortcut: "always",
      license: "license.txt",
    },
    mac: {
	    target: "pkg",
	    category: "public.app-category.utilities",
	    icon: "mac/icon.png",
	    darkModeSupport: true,
    },
    pkg: {
      installLocation: "/Applications",
      license: "license.txt",
      allowAnywhere: true,
      allowCurrentUserHome: true,
      allowRootDirectory: true,
      isVersionChecked: true,
      isRelocatable: false,
      overwriteAction: "upgrade"
    },
    files: [
      "dist/**/*",
      "resources/**/*",
      "node_modules/**/*",
      "package.json"
    ],
  },
  publish: "never",
});
