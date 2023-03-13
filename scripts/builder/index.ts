import { build } from "electron-builder";

import path from "path";

const start = () => {
  console.log("Build start...");

  return build({
    config: {
      asar: true,
      appId: "com.meslzy.electron-boilerplate",
      productName: "Electron Boilerplate",
      artifactName: "${productName}-(${version}).${ext}",
      directories: {
        buildResources: path.join(process.cwd(), "buildResources"),
        output: path.join(process.cwd(), "buildOutput", "${os} ${arch}"),
      },
      win: {
        target: [
          "nsis"
        ],
        icon: "win/icon.png",
        legalTrademarks: "(©) meslzy.com - 2021",
        publisherName: "meslzy",
      },
      nsis: {
        oneClick: false,
        perMachine: true,
        runAfterFinish: true,
        installerIcon: "win/icon.ico",
        uninstallerIcon: "win/icon.ico",
        deleteAppDataOnUninstall: true,
        displayLanguageSelector: false,
        multiLanguageInstaller: false,
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
        "electron/*/dist/**",
        "resources/**",
      ],
      includeSubNodeModules: true,
      removePackageKeywords: true,
      removePackageScripts: true,
    },
    publish: process.env.publish === "true" ? "onTagOrDraft" : "never",
  });
};

start().then(() => {
  console.log("Build complete!");
});