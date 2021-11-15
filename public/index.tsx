import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./app";

import "./index.scss";

window.env = process.env.NODE_ENV as "development" | "production";

ReactDOM.render(<App/>, document.getElementById("app"));
