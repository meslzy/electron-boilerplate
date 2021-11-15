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
	- `npm run render` ( this command will run the [**renderer electron
	  process**](https://www.electronjs.org/docs/tutorial/process-model#the-renderer-process) )
	- `npm run main` ( this command will run the [**main electron
	  process**](https://www.electronjs.org/docs/tutorial/process-model#the-main-process) )
	- `npm run build` ( this command will package and build a ready for distribution for different platforms )

---

### The Structure (🏫)

    │ Application folder
    ├── builder                 # electron builder assets
    │   ├── resources           # resources and common files
    │   │   ├── mac             # mac resources files
    │   │   ├── win             # win resources files
    ├── public                  # renderer electron source files
    ├── source                  # main electron source files
    ├── static                  # dynamic assets files 
    ├── electron.builder.js     # electron builder configuration
    ├── webpack.config.js       # webpack configuration
    ├── package.json
    └── tsconfig.json

### Output Folders (🗑️)

    │ Application folder
    ├── builder
    │   ├── outout              # electron builder outout
    ├── outout                  # webpack output

---

## The End (💘)
