# Electron Boilerplate (✨)

> the best structure to get started for creating an app with Electron and React
---

<div align="center">

![license](https://badgen.net/badge/license/MIT/blue)
![stars](https://badgen.net/github/stars/meslzy/electron-boilerplate/)
![forks](https://badgen.net/github/forks/meslzy/electron-boilerplate)
![issues](https://badgen.net/github/issues/meslzy/electron-boilerplate)

</div>

---

## Getting Started (✅)

- ### Installation (⏬)
  - `git clone https://github.com/meslzy/electron-boilerplate.git`
  - `cd electron-boilerplate`
  - `npm install`

- ### Commands (🌠)
  - `npm run renderer` ( this command will run the [**renderer electron process**](https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process) )
  - `npm run preload` ( this command will run the [**preload electron process**](https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts) )
  - `npm run main` ( this command will run the [**main electron process**](https://www.electronjs.org/docs/latest/tutorial/process-model#the-main-process) )
  - `npm run build` ( this command will package and build a ready for distribution for different platforms )

---

### The Structure (🏫)

    │ Application folder
    ├── build                 # electron builder
    │   ├── resources           # resources and common files
    │   │   ├── mac             # mac only files
    │   │   ├── win             # win only files
    ├── main                    # main process source files
    ├── preload                 # preload process source files
    ├── renderer                # renderer process source files
    ├── resources               # global resource folder  
    ├── electron.builder.ts     # electron builder configuration
    ├── webpack.config.ts       # webpack configuration
    ├── package.json
    └── tsconfig.json

### Output Folders (🗑️)

    │ Application folder
    ├── builder
    │   ├── dist              # electron builder outout
    ├── dist                  # webpack output

---

## The End (💘)
