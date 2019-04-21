import React from "react";
import ReactDOM from "react-dom";
import Controller from "./Controller";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Controller />, document.getElementById("root"));

serviceWorker.unregister();
