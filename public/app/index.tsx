import * as React from "react";

import {ipcRenderer} from "electron";

import "./index.scss";

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <h4 id={"title"}>Electron Boilerplate</h4>
          
          <div id={"control"}>
            <button onClick={() => ipcRenderer.send("minimize")}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 10H5" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button onClick={() => ipcRenderer.send("close")}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.1739 9.99858L14.7537 6.42703C14.9105 6.27026 14.9986 6.05764 14.9986 5.83594C14.9986 5.61423 14.9105 5.40161 14.7537 5.24484C14.597 5.08807 14.3843 5 14.1626 5C13.9409 5 13.7283 5.08807 13.5715 5.24484L10 8.82471L6.42845 5.24484C6.27168 5.08807 6.05906 5 5.83736 5C5.61565 5 5.40303 5.08807 5.24626 5.24484C5.08949 5.40161 5.00142 5.61423 5.00142 5.83594C5.00142 6.05764 5.08949 6.27026 5.24626 6.42703L8.82613 9.99858L5.24626 13.5701C5.16823 13.6475 5.10629 13.7396 5.06403 13.8411C5.02176 13.9425 5 14.0513 5 14.1612C5 14.2711 5.02176 14.3799 5.06403 14.4814C5.10629 14.5828 5.16823 14.6749 5.24626 14.7523C5.32365 14.8303 5.41573 14.8923 5.51718 14.9346C5.61864 14.9768 5.72745 14.9986 5.83736 14.9986C5.94726 14.9986 6.05608 14.9768 6.15753 14.9346C6.25898 14.8923 6.35106 14.8303 6.42845 14.7523L10 11.1724L13.5715 14.7523C13.6489 14.8303 13.741 14.8923 13.8425 14.9346C13.9439 14.9768 14.0527 14.9986 14.1626 14.9986C14.2725 14.9986 14.3814 14.9768 14.4828 14.9346C14.5843 14.8923 14.6763 14.8303 14.7537 14.7523C14.8318 14.6749 14.8937 14.5828 14.936 14.4814C14.9782 14.3799 15 14.2711 15 14.1612C15 14.0513 14.9782 13.9425 14.936 13.8411C14.8937 13.7396 14.8318 13.6475 14.7537 13.5701L11.1739 9.99858Z"
                  fill="black"/>
              </svg>
            </button>
          </div>
        </header>
        
        <main>
          <h4>Hello World</h4>
        </main>
      </React.Fragment>
    );
  };
}

export default App;