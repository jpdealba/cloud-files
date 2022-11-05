import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./components/error";
import { default as Login } from "./routes/login";
import Root from "./routes/root";

import reducers from "./store/reducers";
import "./styles/index.css";
const consoleWarn = console.warn;
const SUPPRESSED_WARNINGS = ["has been externalized for browser compatibility"];
console.warn = function filterWarnings(msg, ...args) {
  if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
    console.log(msg);
    consoleWarn(msg, ...args);
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reducers}>
    <React.StrictMode>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
